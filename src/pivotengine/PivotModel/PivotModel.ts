import type { Cell } from "cli-table3";
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

  getAllCellsSparse(): Cell[][] {
    //TODO: implement sparse mode
    return [];
  }

  getAllCellsDense(): Cell[][] {
    //TODO: implement dense mode
    return [];
  }

  getTanstakedCells(): Cell[][] {
    //TODO: implement transstaked mode
    return [];
  }

}
