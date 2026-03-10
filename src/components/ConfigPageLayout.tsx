import styles from "./ConfigPageLayout.module.css";
import { SVGViewer } from "./SVGViewer";
import { ConfigPanel } from "./ConfigPanel";
import { DataGrid } from "./DataGrid";

export function ConfigPageLayout() {
  return (
    <div className={styles.grid}>
      <SVGViewer className={styles.svgViewer} />
      <ConfigPanel className={styles.configPanel} />
      <DataGrid className={styles.dataGrid} />
    </div>
  );
}
