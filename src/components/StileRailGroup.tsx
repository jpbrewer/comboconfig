"use client";

import { ConfigurationGroup } from "../../devlink/ConfigurationGroup";
import { MeasurementSelectBox } from "../../devlink/MeasurementSelectBox";
import {
  decimalToSelectValues,
  selectValuesToDecimal,
  getInchesOptions,
  getBoundedFractionsOptions,
  clampFractionToRange,
} from "@/lib/measurementUtils";
import styles from "./StileRailGroup.module.css";

const PRECISION = 8;
const RANGE = { min: 1.0, max: 10.0 };

interface StileRailGroupProps {
  srTop: number;
  srBottom: number;
  srLeft: number;
  srRight: number;
  onSrTopChange: (value: number) => void;
  onSrBottomChange: (value: number) => void;
  onSrLeftChange: (value: number) => void;
  onSrRightChange: (value: number) => void;
}

function MeasurementInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (decimal: number) => void;
}) {
  const selectValues = decimalToSelectValues(value, PRECISION) ?? {
    inches: Math.floor(RANGE.min),
    fractionNumerator: 0,
  };
  const { inches, fractionNumerator } = selectValues;

  const inchesOptions = getInchesOptions(RANGE);
  const fractionsOptions = getBoundedFractionsOptions(
    inches,
    RANGE,
    PRECISION
  );

  const handleInchesChange = (newInches: number) => {
    const clampedFraction = clampFractionToRange(
      newInches,
      fractionNumerator,
      RANGE,
      PRECISION
    );
    const decimal = selectValuesToDecimal(newInches, clampedFraction, PRECISION);
    if (decimal !== null) onChange(decimal);
  };

  const handleFractionChange = (newFraction: number) => {
    const decimal = selectValuesToDecimal(inches, newFraction, PRECISION);
    if (decimal !== null) onChange(decimal);
  };

  return (
    <MeasurementSelectBox
      label={label}
      selectInsertionInch={
        <select
          className={styles.select}
          value={inches}
          onChange={(e) => handleInchesChange(Number(e.target.value))}
        >
          {inchesOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      }
      selectInsertionFrac={
        <select
          className={styles.select}
          value={fractionNumerator}
          onChange={(e) => handleFractionChange(Number(e.target.value))}
        >
          {fractionsOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      }
    />
  );
}

export function StileRailGroup({
  srTop,
  srBottom,
  srLeft,
  srRight,
  onSrTopChange,
  onSrBottomChange,
  onSrLeftChange,
  onSrRightChange,
}: StileRailGroupProps) {
  return (
    <ConfigurationGroup
      groupName="Stile/Rail Measurements"
      groupInsertionSlot={
        <>
          <MeasurementInput
            label="Top"
            value={srTop}
            onChange={onSrTopChange}
          />
          <MeasurementInput
            label="Bottom"
            value={srBottom}
            onChange={onSrBottomChange}
          />
          <MeasurementInput
            label="Left"
            value={srLeft}
            onChange={onSrLeftChange}
          />
          <MeasurementInput
            label="Right"
            value={srRight}
            onChange={onSrRightChange}
          />
        </>
      }
    />
  );
}
