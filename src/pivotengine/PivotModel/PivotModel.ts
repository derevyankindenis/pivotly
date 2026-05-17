import type { Cell } from "cli-table3";
import { DimensionNode } from "../DimensionTree/DimensionNode";
import { DimensionTree } from "../DimensionTree/DimensionTree";
import { FactTable } from "../FactTable";
import type { Config } from "../types";
import type { Size } from "./PivotModel.types";


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

  get rowLeavesSize() {
    return this.rowsTree.leavesSize;
  }

  get colLeavesSize() {
    return this.colsTree.leavesSize;
  }

  get rowHeaderSize() {
    return this.rowsTree.depth;
  }

  get colHeaderSize() {
    return this.colsTree.depth;
  }

  getFullSize(): Size {
    return {
      width: this.rowHeaderSize + this.colLeavesSize,
      height: this.colHeaderSize + this.rowLeavesSize
    };
  };

 *getCornerCells(): Generator<Cell> {

  }


  *getCells(): Generator {

  }

  getAllCellsSparse(): Cell[][] {
    //TODO: implement sparse mode
    return [];
  }

  getAllCellsDense(): Cell[][] {
    //TODO: implement dense mode
    return [];
  }

  getTanstakedCells(): Cell[][] {
    const result: Cell[][] = [];

    // Group column-tree nodes by depth level (BFS)
    const colNodesByDepth: DimensionNode[][] =
      Array.from({ length: this.colHeaderSize }, () => []);
    for (const node of this.colsTree.bfs()) {
      colNodesByDepth[node.depth - 1].push(node);
    }

    // Header rows
    for (let d = 0; d < this.colHeaderSize; d++) {
      const row: Cell[] = [];
      for (let r = 0; r < this.rowHeaderSize; r++) {
        row.push(d === this.colHeaderSize - 1
          ? capitalize(this.config.report.slice.rows[r].uniqueName)
          : '');
      }
      for (const node of colNodesByDepth[d]) {
        const ls = node.leavesSize;
        row.push(ls > 1
          ? { content: String(node.value), colSpan: ls, hAlign: 'center' }
          : { content: String(node.value), hAlign: 'center' });
      }
      result.push(row);
    }

    // Column leaves in DFS order
    const colLeaves: DimensionNode[] = [];
    for (const { node } of this.colsTree.dfs()) {
      if (node.isLeaf) colLeaves.push(node);
    }

    // Data rows (DFS through row tree)
    const emitted = new Set<string>();

    for (const { node: leaf } of this.rowsTree.dfs()) {
      if (!leaf.isLeaf) continue;

      const row: Cell[] = [];

      // Collect ancestor path (root → leaf)
      const path: DimensionNode[] = [];
      let cur: DimensionNode | null = leaf;
      while (cur && cur.depth > 0) {
        path.unshift(cur);
        cur = cur.parent;
      }

      for (const ancestor of path) {
        if (!emitted.has(ancestor.key)) {
          emitted.add(ancestor.key);
          const ls = ancestor.leavesSize;
          row.push(ls > 1
            ? { content: String(ancestor.value), rowSpan: ls }
            : String(ancestor.value));
        }
      }

      for (const colLeaf of colLeaves) {
        const value = this.factTable.get(leaf, colLeaf);
        row.push({ content: value !== undefined ? formatNumber(Number(value)) : '', hAlign: 'right' });
      }

      result.push(row);
    }

    return result;
  }

}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatNumber(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
