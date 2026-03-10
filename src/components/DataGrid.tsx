import styles from "./DataGrid.module.css";

interface DataGridProps {
  className?: string;
}

export function DataGrid({ className }: DataGridProps) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <span className={styles.label}>DataGrid</span>
      {/* TODO: hydrate with data */}
    </div>
  );
}
