# Skill: Measurement Utilities

## Purpose

This skill defines a reusable set of TypeScript utility functions for converting decimal inch measurements to fractional display strings and select box values, and back again. These utilities are used any time a measurement stored as a decimal in JSON needs to be presented to a user as fractional inches (in select boxes or display text), or when a user's fractional input needs to be saved back as a decimal.

This skill is always available. Claude should apply it automatically whenever:
- A measurement field needs to be presented as a user input (select boxes)
- A decimal measurement needs to be displayed as a formatted string
- A fractional user selection needs to be converted back to a decimal for storage

---

## Concepts

### Precision
Precision defines the smallest fraction of an inch in use. It is always expressed as the denominator:
- `2` = halves (1/2")
- `4` = quarters (1/4")
- `8` = eighths (1/8")
- `16` = sixteenths (1/16")
- `32` = thirty-seconds (1/32")

Precision is always passed as a parameter — never hardcoded. When Claude adds a measurement input to a component, it must ask the human what precision is required if not already specified.

### Range
Range defines the minimum and maximum **decimal** inch values the select pair must stay within. Expressed as `{ min: number, max: number }` in decimal inches (e.g. `{ min: 42.125, max: 47.0 }`). `min` can be `0`. Values are always positive. When Claude adds a measurement input, it must ask the human what range is required if not already specified.

The range constrains both select boxes:
- The inches select covers `Math.floor(range.min)` through `Math.floor(range.max)`
- The fractions select is filtered based on which whole inch is currently selected (see Bounded Range section below)

### Storage format
Measurements are always stored as **decimal inches** in JSON (e.g. `4.5`, `21.75`, `0.125`).

### Display format
Measurements are displayed as fractional strings: `{whole}"-{numerator}/{denominator}"` (e.g. `4-1/2"`, `21-3/4"`, `0-1/8"`).

### Whole number display
A measurement with no fractional part displays as `{whole}"` with a fraction of `0/0"` (e.g. `4"` as a string, `0/0"` as the fraction label).

---

## File Location

Place all measurement utility functions in:
```
/lib/measurementUtils.ts
```

If this file does not yet exist, create it. All functions below are exports from this file.

---

## Functions to Implement

### 1. `decimalToFraction(decimal: number, precision: number): { whole: number; numerator: number; denominator: number } | null`

Converts a decimal inch value to its fractional components.

**Rules:**
- Extract whole inches via `Math.floor`
- Multiply the remainder by `precision` to get the raw numerator
- Round **down** (`Math.floor`) to the nearest valid numerator if not exact
- Reduce the fraction to lowest terms using GCD
- If the numerator reduces to `0`, return `{ whole, numerator: 0, denominator: 0 }` (the `0/0` case)
- Return `null` for negative inputs

**Examples at precision `8`:**
```
4.5   → { whole: 4, numerator: 1, denominator: 2 }   // 4-1/2"
4.375 → { whole: 4, numerator: 3, denominator: 8 }   // 4-3/8"
4.0   → { whole: 4, numerator: 0, denominator: 0 }   // 4" (whole only)
0.125 → { whole: 0, numerator: 1, denominator: 8 }   // 0-1/8"
```

---

### 2. `fractionToDecimal(whole: number, numerator: number, denominator: number): number | null`

Converts fractional components back to a decimal.

**Rules:**
- If `denominator` is `0` (the `0/0` case), treat as `0` fractional part
- Return `whole + numerator / denominator`
- Return `null` for negative inputs or invalid combinations

**Examples:**
```
(4, 1, 2)  → 4.5
(4, 3, 8)  → 4.375
(4, 0, 0)  → 4.0
(0, 1, 8)  → 0.125
```

---

### 3. `formatMeasurement(decimal: number, precision: number): string | null`

Converts a decimal to a display string.

**Rules:**
- Uses `decimalToFraction` internally
- If fraction is `0/0`, returns `{whole}"`  (e.g. `4"`)
- Otherwise returns `{whole}-{numerator}/{denominator}"` (e.g. `4-1/2"`, `0-1/8"`)
- Returns `null` if `decimalToFraction` returns `null`

**Examples at precision `8`:**
```
4.5   → "4-1/2\""
4.0   → "4\""
0.125 → "0-1/8\""
21.75 → "21-3/4\""
```

---

### 4. `getInchesOptions(range: { min: number; max: number }): Array<{ label: string; value: number }>`

Generates the options array for the **inches select box**.

**Rules:**
- Derives whole-inch bounds via `Math.floor(range.min)` and `Math.floor(range.max)`
- Produces one option per whole inch across that span, inclusive
- `label` is `{n}"` (e.g. `0"`, `1"`, `4"`)
- `value` is the whole number integer (e.g. `0`, `1`, `4`)

**Example for range `{ min: 42.125, max: 47.0 }`:**
```ts
[
  { label: '42"', value: 42 },
  { label: '43"', value: 43 },
  { label: '44"', value: 44 },
  { label: '45"', value: 45 },
  { label: '46"', value: 46 },
  { label: '47"', value: 47 },
]
```

---

### 5. `getFractionsOptions(precision: number): Array<{ label: string; value: number }>`

Generates the options array for the **fractions select box**.

**Rules:**
- Produces options for numerators `0` through `precision - 1`
- Numerator `0` → `label: "0/0\""`, `value: 0`
- All other numerators are reduced to lowest terms for the **label**, but the **value** is always the raw numerator (1, 2, 3 … precision-1)
- Denominator in label is always the reduced denominator

**Example at precision `8`:**
```ts
[
  { label: '0/0"', value: 0 },
  { label: '1/8"', value: 1 },
  { label: '1/4"', value: 2 },   // reduced from 2/8
  { label: '3/8"', value: 3 },
  { label: '1/2"', value: 4 },   // reduced from 4/8
  { label: '5/8"', value: 5 },
  { label: '3/4"', value: 6 },   // reduced from 6/8
  { label: '7/8"', value: 7 },
]
```

---

### 6. `decimalToSelectValues(decimal: number, precision: number): { inches: number; fractionNumerator: number } | null`

Converts a decimal to the pair of select box values needed to pre-select the correct options.

**Rules:**
- Uses `decimalToFraction` internally
- Returns `{ inches: whole, fractionNumerator: rawNumerator }`
- `rawNumerator` is the **unreduced** numerator (i.e. the `value` field from `getFractionsOptions`)
- Returns `null` if `decimalToFraction` returns `null`

**Examples at precision `8`:**
```
4.5   → { inches: 4, fractionNumerator: 4 }  // selects "4"" and "1/2"" (value 4)
4.375 → { inches: 4, fractionNumerator: 3 }  // selects "4"" and "3/8"" (value 3)
4.0   → { inches: 4, fractionNumerator: 0 }  // selects "4"" and "0/0"" (value 0)
0.125 → { inches: 0, fractionNumerator: 1 }  // selects "0"" and "1/8"" (value 1)
```

---

### 7. `selectValuesToDecimal(inches: number, fractionNumerator: number, precision: number): number | null`

Converts select box values back to a decimal for storage.

**Rules:**
- If `fractionNumerator` is `0`, treat as whole number (no fractional part)
- Otherwise compute `inches + fractionNumerator / precision`
- Returns `null` for negative inputs

**Examples at precision `8`:**
```
(4, 4, 8) → 4.5
(4, 3, 8) → 4.375
(4, 0, 8) → 4.0
(0, 1, 8) → 0.125
```

---

---

## Bounded Range Select Functions

These functions extend the basic select box utilities with range-awareness. Use these instead of `getFractionsOptions` whenever a decimal range constraint is in effect.

---

### 8. `getBoundedFractionsOptions(selectedInches: number, range: { min: number; max: number }, precision: number): Array<{ label: string; value: number }>`

Generates a filtered fractions options array based on which whole inch is currently selected and the decimal range bounds.

**Rules:**

Determine the role of `selectedInches`:

- **Min inch** = `Math.floor(range.min)`
- **Max inch** = `Math.floor(range.max)`
- **Mid-range inch** = anything between min and max exclusive

Then filter:

| Selected inch | Valid fraction numerators |
|---|---|
| Min inch | Raw numerators ≥ `(range.min - Math.floor(range.min)) * precision` (rounded up via `Math.ceil`) |
| Max inch | Raw numerators ≤ `(range.max - Math.floor(range.max)) * precision` (rounded down via `Math.floor`) |
| Mid-range | All numerators `0` through `precision - 1` |

- Apply the same label reduction rules as `getFractionsOptions` (labels reduced to lowest terms, values are raw numerators)
- `0/0` (value `0`) is included only when it passes the filter (i.e. when `selectedInches` is not the min inch, or when `range.min` is a whole number)

**Examples at precision `8`, range `{ min: 42.125, max: 47.0 }`:**

At `selectedInches = 42` (min inch, min fraction = `0.125 * 8 = 1`):
```ts
// 0/0 excluded, starts at 1/8
[
  { label: '1/8"', value: 1 },
  { label: '1/4"', value: 2 },
  { label: '3/8"', value: 3 },
  { label: '1/2"', value: 4 },
  { label: '5/8"', value: 5 },
  { label: '3/4"', value: 6 },
  { label: '7/8"', value: 7 },
]
```

At `selectedInches = 45` (mid-range):
```ts
// All options available
[
  { label: '0/0"', value: 0 },
  { label: '1/8"', value: 1 },
  ...
  { label: '7/8"', value: 7 },
]
```

At `selectedInches = 47` (max inch, max fraction = `0.0 * 8 = 0`):
```ts
// Only 0/0 available
[
  { label: '0/0"', value: 0 },
]
```

At `selectedInches = 47` with range `{ min: 42.125, max: 47.5 }` (max fraction = `0.5 * 8 = 4`):
```ts
[
  { label: '0/0"', value: 0 },
  { label: '1/8"', value: 1 },
  { label: '1/4"', value: 2 },
  { label: '3/8"', value: 3 },
  { label: '1/2"', value: 4 },
]
```

---

### 9. `clampFractionToRange(selectedInches: number, currentFractionNumerator: number, range: { min: number; max: number }, precision: number): number`

When the inches value changes, this function checks whether the current fraction numerator is still valid and snaps it to the nearest valid value if not.

**Rules:**
- Compute the valid fraction options for the new `selectedInches` via `getBoundedFractionsOptions`
- If `currentFractionNumerator` is in the valid set → return it unchanged
- If `currentFractionNumerator` is **too high** (max inch case) → return the **highest valid numerator**
- If `currentFractionNumerator` is **too low** (min inch case) → return the **lowest valid numerator**
- Never returns a value outside the valid set

**Examples at precision `8`, range `{ min: 42.125, max: 47.0 }`:**
```
selectedInches=47, currentFraction=6  → 0  (snaps down to max valid: 0/0)
selectedInches=42, currentFraction=0  → 1  (snaps up to min valid: 1/8)
selectedInches=44, currentFraction=5  → 5  (mid-range, unchanged)
```

---

## Updated Usage Pattern (Bounded Range)

When a decimal range is provided, use the bounded variants:

```tsx
const decimalRange = { min: 42.125, max: 47.0 };
const precision = 8;

// 1. On load
const { inches, fractionNumerator } = decimalToSelectValues(storedDecimal, precision)
  ?? { inches: Math.floor(decimalRange.min), fractionNumerator: 0 };

// 2. On inches change
const handleInchesChange = (newInches: number) => {
  const clampedFraction = clampFractionToRange(newInches, fractionNumerator, decimalRange, precision);
  setInches(newInches);
  setFractionNumerator(clampedFraction);
};

// 3. Render
<InchesSelect
  options={getInchesOptions(decimalRange)}
  value={inches}
  onChange={handleInchesChange}
/>
<FractionsSelect
  options={getBoundedFractionsOptions(inches, decimalRange, precision)}
  value={fractionNumerator}
  onChange={setFractionNumerator}
/>

// 4. On save
const newDecimal = selectValuesToDecimal(inches, fractionNumerator, precision);
```

---

## Helper: GCD

Implement a private `gcd(a: number, b: number): number` function in the same file for fraction reduction. This is not exported.

```ts
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
```

---

## Usage Pattern

When Claude adds a measurement input pair to a component, the pattern is always:

```tsx
// 1. On load — convert stored decimal to select values
const { inches, fractionNumerator } = decimalToSelectValues(storedDecimal, precision) ?? { inches: 0, fractionNumerator: 0 };

// 2. Render — generate options and pre-select correct values
<InchesSelect
  options={getInchesOptions(range)}
  value={inches}
  onChange={...}
/>
<FractionsSelect
  options={getFractionsOptions(precision)}
  value={fractionNumerator}
  onChange={...}
/>

// 3. On change — convert back to decimal for state/storage
const newDecimal = selectValuesToDecimal(inches, fractionNumerator, precision);
```

---

## Questions Claude Must Ask

Before implementing any measurement input, Claude must confirm with the human:
1. **Precision** — halves, quarters, eighths, sixteenths, or thirty-seconds?
2. **Range** — is there a decimal min/max constraint (e.g. `42.125` to `47.0`)? If so, use the bounded range functions. If the range is whole numbers only, the basic functions suffice.

These must never be assumed or hardcoded without explicit confirmation.

---

## Validation Rules

- All functions return `null` on invalid input — never throw
- Negative values always return `null`
- Callers are responsible for handling `null` returns gracefully
- `0/0` is a valid and expected state representing a whole number with no fractional part
