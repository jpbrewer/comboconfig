"use client";

import { ConfigurationGroup } from "../../devlink/ConfigurationGroup";
import { SelectBox } from "../../devlink/SelectBox";
import styles from "./LiteDesignGroup.module.css";

interface LiteDesignGroupProps {
  rows: number;
  cols: number;
  onRowsChange: (value: number) => void;
  onColsChange: (value: number) => void;
}

const OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export function LiteDesignGroup({
  rows,
  cols,
  onRowsChange,
  onColsChange,
}: LiteDesignGroupProps) {
  return (
    <ConfigurationGroup
      groupName="Lite Design"
      groupInsertionSlot={
        <>
          <SelectBox
            label="Rows"
            selectInsertionSlot={
              <select
                className={styles.select}
                value={rows}
                onChange={(e) => onRowsChange(Number(e.target.value))}
              >
                {OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            }
          />
          <SelectBox
            label="Columns"
            selectInsertionSlot={
              <select
                className={styles.select}
                value={cols}
                onChange={(e) => onColsChange(Number(e.target.value))}
              >
                {OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            }
          />
        </>
      }
    />
  );
}
