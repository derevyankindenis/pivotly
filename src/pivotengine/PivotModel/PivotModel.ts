import { DimensionTree } from "../DimensionTree/DimensionTree";
import { FactTable } from "../FactTable";
import type { Config } from "../types";
import { PivotCellStream } from "./PivotCellStream";
import type { CellType } from "./PivotModel.types";
import { SizeComputer } from "./SizeComputer";

export class PivotModel {

  private readonly rowsTree: DimensionTree;
  private readonly colsTree: DimensionTree;
  private readonly factTable: FactTable;

  private readonly cellStream: PivotCellStream;
  private readonly sizeComputer: SizeComputer;

  constructor(
    private readonly config: Config
  ) {

    const { slice } = this.config.report;

    this.rowsTree = new DimensionTree(slice.rows);
    this.colsTree = new DimensionTree(slice.columns);
    this.factTable = new FactTable();

    this.sizeComputer = new SizeComputer(this.colsTree, this.rowsTree);
    this.cellStream = new PivotCellStream(slice, this.sizeComputer, this.colsTree, this.rowsTree, this.factTable);

    this.fillData();
  }

  get cells() {
    return this.cellStream.cells();
  }

  get rows() {
    return this.cellStream.rows();
  }


  /**
  * Returns the cell at the given grid position.
  * Position is treated as absolute coordinates within the full grid,
  * including header zones — `(0, 0)` is the top-left corner of the table.
  */
  getCellType(col: number, row: number): CellType {
    const { fullSize, cornerSize } = this.sizeComputer;
    if (col < 0 || row < 0 || col >= fullSize.width || row >= fullSize.height) {
      return "OutOfBounds";
    } else if (col < this.sizeComputer.cornerSize.width && row < cornerSize.height) {
      return "Corner";
    } else if (col < cornerSize.width) {
      return "RowHeader";
    } else if (row < cornerSize.height) {
      return "ColHeader";
    } else {
      return "Data";
    }
  }

  private fillData() {
    const { report: { datasource, slice } } = this.config;
    datasource.forEach(row => {
      const rowLeaf = this.rowsTree.insertPath(row);
      const colLeaf = this.colsTree.insertPath(row);
      const measureValue = row[slice.measures[0].uniqueName];
      this.factTable.add(rowLeaf, colLeaf, measureValue);
    })
  }

}