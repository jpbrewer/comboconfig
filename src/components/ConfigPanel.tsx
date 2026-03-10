import styles from "./ConfigPanel.module.css";

interface ConfigPanelProps {
  className?: string;
}

export function ConfigPanel({ className }: ConfigPanelProps) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <span className={styles.label}>ConfigPanel</span>
      {/* TODO: hydrate with data */}
    </div>
  );
}
