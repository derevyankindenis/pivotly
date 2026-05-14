import { DimensionTree } from "../DimensionTree/DimensionTree";
import { FactTable } from "../FactTable";
import type { Config } from "../types";
import type { Size } from "./PivotModel.types";
import type { Cell as TableCell } from "cli-table3";

export class PivotModel {

  private readonly rowsTree: DimensionTree;
  private readonly colsTree: DimensionTree;
  private readonly factTable: FactTable;

  constructor(
    private readonly config: Config
  ) {

    this.rowsTree = new DimensionTree(config.report.slice.rows);
    this.colsTree = new DimensionTree(config.report.slice.columns);
    this.factTable = new FactTable();

    const { datasource, slice } = this.config.report;

    datasource.forEach(row => {
      const rowLeaf = this.rowsTree.insertPath(row);
      const colLeaf = this.colsTree.insertPath(row);
      const measureValue = row[slice.measures[0].uniqueName];
      this.factTable.add(rowLeaf, colLeaf, measureValue);
    })
  }

  getSize(): Size {
    return {
      width: this.rowsTree.depth + this.colsTree.leavesSize,
      height: this.colsTree.depth + this.rowsTree.leavesSize,
    };
  };

  // TODO: Collect full table
  getAllCells() {
    const cells: TableCell[][] = [];

    /** Add corner header */
    const { columns, rows } = this.config.report.slice;

    cells[0] = [];
    rows.forEach(row => {
      cells[0].push({
        content: row.uniqueName,
        rowSpan: columns.length,
        hAlign: "center",
        vAlign: "center"
      })
    })

    /** Add column headers */
    for (const node of this.colsTree.bfs()) {
      const { value, leavesSize, depth } = node;
      const rowNum = depth - 1;

      if (!cells[rowNum]) {
        cells[rowNum] = [];
      }

      cells[rowNum].push({
        content: value,
        rowSpan: 1,
        colSpan: leavesSize,
        hAlign: "center",
        vAlign: "center"
      })
    }

    /** Add row headers */
    let rowNum = this.colsTree.depth - 1;
    for(const node of this.rowsTree.dfs()) {
      
    }

    /** Add row headers 
    let lastDepth = 1;
    let rowNum = this.colsTree.depth - 1;
    for (const node of this.rowsTree.bfs()) {
      const { value, leavesSize, depth } = node;
      if(depth !== lastDepth) {
        lastDepth = depth;
        rowNum = this.colsTree.depth;
      } else {
        rowNum++;
      }

      if (!cells[rowNum]) {
        cells[rowNum] = [];
      }

      cells[rowNum].push({
        content: value,
        rowSpan: leavesSize,
        colSpan: 1,
        hAlign: "center",
        vAlign: "center"
      })
    }
*/

    return cells;
  }



}
