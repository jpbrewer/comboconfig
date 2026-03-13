# Skill: DevLink Sync

## Trigger
This skill activates when either:
- The human commands Claude directly to "Devlink Sync" or "Sync WebFlow" or says something like "I just synced DevLink", "DevLink updated", "I re-exported from Webflow", or similar
- Claude detects that files in `/devlink` have changed since the last known state

---

## Purpose
Run the Webflow DevLink sync command, then audit the changes, verify naming conventions, identify what is new or modified, and update the codebase accordingly — but only after naming conventions have been confirmed clean.

---

## Step 0 — Run the Sync Command

Run the following bash command to pull the latest DevLink components from Webflow:

```bash
webflow devlink sync
```

Wait for this to complete before proceeding. If it fails, report the error and stop.

---

## Step 1 — Audit `/devlink` for Changes

Read the `/devlink` directory and identify:
- **New components** — files that did not exist before the sync
- **Modified components** — files that changed (new props, removed props, structural changes)
- **Removed components** — files that no longer exist

Report a clear summary of what changed before doing anything else.

---

## Step 2 — Naming Convention Check (ALWAYS BEFORE TOUCHING THE CODEBASE)

This step is mandatory and must be completed before any wiring, typing, or logic work begins.

Inspect every changed or new file in `/devlink` and check the following:

### Classes
- ✅ Must be: `lowercase-with-dashes`
- ❌ Flags: `camelCase`, `PascalCase`, `lowercase_with_underscores`, mixed

### IDs
- ✅ Must be: `lowercase_with_underscores`
- ❌ Flags: `camelCase`, `PascalCase`, `lowercase-with-dashes`, mixed
- ⏭️ **Skip** Webflow auto-generated IDs (e.g. `w-node-*` hashes) — these are non-semantic and cannot be controlled in Webflow. Only flag IDs that were explicitly set by the developer.

### `data-*` Attributes
- ✅ Attribute name must be: `data-lowercase-with-dashes` (e.g. `data-block-pos`)
- ✅ Attribute value must be: `lowercase_with_underscores` (e.g. `data-block-pos="pos_1"`)
- ❌ Flags: dashes in values, camelCase in attribute names, uppercase anywhere
- ⏭️ **Exception:** `data-pos-selector` values should match the JSON data model exactly (e.g. `pos1`, `pos2`) — do not require underscores
- ⏭️ **Skip** `data-w-tab` attributes — these are Webflow's internal tab system and cannot be controlled

### When a violation is found:
1. **Stop immediately** — do not proceed to Step 3 (of the main list)
2. List every violation clearly, for example:
   > ⚠️ Naming violation in `BlockSelector.tsx`:
   > - Class `blockSelector_wrapper` → should be `block-selector-wrapper`
   > - `data-blockPos="pos1"` → attribute should be `data-block-pos`, value should be `pos_1`
3. Suggest the correct name for each violation
4. Say:
   > "Please fix these in Webflow and re-export via DevLink before I proceed."
5. **Wait.** Do not continue to Step 3 until the human confirms the fixes have been synced.

---

## Step 3 — Identify New and Modified Props

For each new or modified component, list:
- All **new props** added
- All **removed props** (flag if these were previously wired up — removal may break existing logic)
- Any **renamed props**
- Infer TypeScript types from prop usage and context; if a prop's type is ambiguous, ask the human before assuming

---

## Step 4 — Update TypeScript Types

- If new props have been added, ensure the component's prop types are current
- Prefer **inferring types** from DevLink exports where possible
- If a type is genuinely unclear, ask the human rather than using `any`
- Do not define types inside `/devlink` — any explicit type definitions go in `/types`

---

## Step 5 — Update Wiring in `/app` and `/lib`

- Wire any new props into the relevant page logic or handler functions
- If a new prop requires new logic (e.g. a new configuration option), note it and ask the human how they want it handled before writing the logic
- If a previously wired prop has been removed, flag the breakage and propose a fix
- If a new component has been added that hasn't been used yet, note it but do not place it in the UI without instruction

---

## Step 6 — Summary Report

After completing all steps, provide a concise summary:

```
DevLink Sync Summary
─────────────────────────────
✅ Naming conventions: PASSED (or list fixes that were made)
📦 New components: [list]
✏️  Modified components: [list]
🗑️  Removed components: [list]
🔧 Props added: [list by component]
⚠️  Props removed (breaking): [list]
📝 Types updated: [list]
🔌 Wiring updated: [list]
❓ Awaiting human input on: [list any open questions]
```

---

## Naming Convention Reference

| Element | Format | Example |
|---|---|---|
| CSS class | `lowercase-with-dashes` | `block-selector-wrapper` |
| HTML/React ID | `lowercase_with_underscores` | `block_selector_wrapper` |
| `data-*` attribute name | `data-lowercase-with-dashes` | `data-block-pos` |
| `data-*` attribute value | `lowercase_with_underscores` | `pos_1` |
| Component names (from Webflow) | `PascalCase` — as exported, do not rename | `BlockSelector` |
| Props | `camelCase` | `onBlockSelect`, `isSelected` |
| Callback props | `camelCase` with `on` prefix | `onBlockSelect`, `onChange` |
| Boolean props | `camelCase` with `is` or `has` prefix | `isActive`, `hasError` |
| Files in `/app` and `/lib` | No enforced convention — match existing project style | — |

---

## Variant Props

Webflow component variants export as a `variant` prop on the DevLink component. Claude wires this prop to React state — Webflow owns the styles, Claude owns the logic.

### Naming Convention for Variants
- ✅ Must be: `PascalCase`, no spaces or dashes (e.g. `Active`, `Inactive`, `Selected`, `Expanded`)
- ❌ Flags: `kebab-case`, `snake_case`, spaces, or mixed case (e.g. `active-state`, `green state`, `ACTIVE`)
- Variant names become prop values in the exported component — bad names produce messy TypeScript

### When a variant prop is detected in a new or modified component:
1. Note the component name and the possible variant values
2. Infer the TypeScript union type, e.g.:
   ```ts
   variant: "Active" | "Inactive"
   ```
3. Ask the human which state conditions should drive each variant value before wiring logic
4. Wire it cleanly in `/app` or `/lib`, e.g.:
   ```tsx
   <BlockSelectorButton variant={isSelected ? "Active" : "Inactive"} />
   ```

### Variant naming violations:
- Flag using the same format as class/ID violations in Step 2
- Stop and wait for the human to rename in Webflow and re-sync before proceeding

---

## Hard Rules (Never Violate)

- ⛔ Never edit, create, or delete any file in `/devlink`
- ⛔ Never proceed past Step 2 if a naming violation exists — always wait for human to fix Webflow fix and re-sync
- ⛔ Never use `any` as a TypeScript type without asking first
- ⛔ Never place a new DevLink component into the UI without explicit instruction
- ✅ Always treat `/devlink` contents as read-only source material to wire against, not to modify
