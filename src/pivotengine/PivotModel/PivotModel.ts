import { DimensionTree } from "../DimensionTree/DimensionTree";
import { FactTable } from "../FactTable";
import type { Config } from "../types";
import type { Cell, Size } from "./PivotModel.types";

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
        width:  this.rowsTree.depth + this.colsTree.leavesSize,
        height: this.colsTree.depth + this.rowsTree.leavesSize,
    };
  };

  getColHeaderCells(): Cell[][] {
    return this.colsTree.collectCells();
  }

}
