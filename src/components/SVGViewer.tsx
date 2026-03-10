import styles from "./SVGViewer.module.css";

interface SVGViewerProps {
  className?: string;
}

export function SVGViewer({ className }: SVGViewerProps) {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <span className={styles.label}>SVGViewer</span>
      {/* TODO: hydrate with data */}
    </div>
  );
}
