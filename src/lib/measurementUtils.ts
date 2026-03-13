function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function decimalToFraction(
  decimal: number,
  precision: number
): { whole: number; numerator: number; denominator: number } | null {
  if (decimal < 0) return null;

  const whole = Math.floor(decimal);
  const remainder = decimal - whole;
  const rawNumerator = Math.floor(remainder * precision);

  if (rawNumerator === 0) {
    return { whole, numerator: 0, denominator: 0 };
  }

  const divisor = gcd(rawNumerator, precision);
  return {
    whole,
    numerator: rawNumerator / divisor,
    denominator: precision / divisor,
  };
}

export function fractionToDecimal(
  whole: number,
  numerator: number,
  denominator: number
): number | null {
  if (whole < 0 || numerator < 0 || denominator < 0) return null;
  if (denominator === 0) return whole;
  return whole + numerator / denominator;
}

export function formatMeasurement(
  decimal: number,
  precision: number
): string | null {
  const result = decimalToFraction(decimal, precision);
  if (result === null) return null;

  if (result.numerator === 0) {
    return `${result.whole}"`;
  }
  return `${result.whole}-${result.numerator}/${result.denominator}"`;
}

export function getInchesOptions(range: {
  min: number;
  max: number;
}): Array<{ label: string; value: number }> {
  const minInch = Math.floor(range.min);
  const maxInch = Math.floor(range.max);
  const options: Array<{ label: string; value: number }> = [];

  for (let n = minInch; n <= maxInch; n++) {
    options.push({ label: `${n}"`, value: n });
  }
  return options;
}

export function getFractionsOptions(
  precision: number
): Array<{ label: string; value: number }> {
  const options: Array<{ label: string; value: number }> = [
    { label: '0/0"', value: 0 },
  ];

  for (let num = 1; num < precision; num++) {
    const divisor = gcd(num, precision);
    const reducedNum = num / divisor;
    const reducedDen = precision / divisor;
    options.push({ label: `${reducedNum}/${reducedDen}"`, value: num });
  }
  return options;
}

export function decimalToSelectValues(
  decimal: number,
  precision: number
): { inches: number; fractionNumerator: number } | null {
  if (decimal < 0) return null;

  const whole = Math.floor(decimal);
  const remainder = decimal - whole;
  const rawNumerator = Math.floor(remainder * precision);

  return { inches: whole, fractionNumerator: rawNumerator };
}

export function selectValuesToDecimal(
  inches: number,
  fractionNumerator: number,
  precision: number
): number | null {
  if (inches < 0 || fractionNumerator < 0) return null;
  if (fractionNumerator === 0) return inches;
  return inches + fractionNumerator / precision;
}

export function getBoundedFractionsOptions(
  selectedInches: number,
  range: { min: number; max: number },
  precision: number
): Array<{ label: string; value: number }> {
  const minInch = Math.floor(range.min);
  const maxInch = Math.floor(range.max);

  let minNumerator = 0;
  let maxNumerator = precision - 1;

  if (selectedInches === minInch) {
    minNumerator = Math.ceil((range.min - minInch) * precision);
  }
  if (selectedInches === maxInch) {
    maxNumerator = Math.floor((range.max - maxInch) * precision);
  }

  const allOptions = getFractionsOptions(precision);
  return allOptions.filter(
    (opt) => opt.value >= minNumerator && opt.value <= maxNumerator
  );
}

export function clampFractionToRange(
  selectedInches: number,
  currentFractionNumerator: number,
  range: { min: number; max: number },
  precision: number
): number {
  const validOptions = getBoundedFractionsOptions(
    selectedInches,
    range,
    precision
  );

  if (validOptions.length === 0) return 0;

  const validValues = validOptions.map((opt) => opt.value);

  if (validValues.includes(currentFractionNumerator)) {
    return currentFractionNumerator;
  }

  if (currentFractionNumerator > validValues[validValues.length - 1]) {
    return validValues[validValues.length - 1];
  }

  return validValues[0];
}
