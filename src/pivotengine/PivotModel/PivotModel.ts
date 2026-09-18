import { DimensionNode } from "../DimensionTree/DimensionNode";
import { DimensionTree } from "../DimensionTree/DimensionTree";
import { FactTable } from "../FactTable";
import type { Config } from "../types";
import type { Cell, CellType, CornerCell, DataCell, EmptyCell, HeaderCell, RowHeaderCell, Size } from "./PivotModel.types";

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
  //#region size provider
  get colHeaderSize(): Size {
    return {
      width: this.colsTree.leavesSize,
      height: this.colsTree.depth
    }
  }

  get rowHeaderSize(): Size {
    return {
      width: this.rowsTree.depth,
      height: this.rowsTree.leavesSize
    }
  }

  get cornerSize(): Size {
    return {
      width: this.rowHeaderSize.width,
      height: this.colHeaderSize.height
    }
  }

  get fullSize(): Size {
    const { width: cornerWidth, height: cornerHeight } = this.cornerSize;
    return {
      width: cornerWidth + this.colHeaderSize.width,
      height: cornerHeight + this.rowHeaderSize.height
    };
  };

  //#endregion

  // #region dense matrix mode

  *cornerCells(): Generator<CornerCell> {
    const { rows, columns } = this.config.report.slice;
    const { width, height } = this.cornerSize
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const position = { x: col, y: col };
        const dimRow = rows[col];
        const dimCol = columns[row];
        yield {
          type: "Corner",
          crossDimensions: {
            col: dimCol,
            row: dimRow
          },
          currentPosition: position,
          anchorPosition: position,
          isAnchor: true,
          size: { width: 1, height: 1 },
          content: `${dimRow.uniqueName}/${dimCol.uniqueName}`,
          id: `corner${col}:${row}`
        };
      }
    }
  }

  *colHeaderCells() {
    const colsTreeEl = this.colsTree.bfs();
    const { width, height } = this.colHeaderSize;
    for (let row = 0; row < height; row++) {
      let col = 0;
      while (col < width) {
        const el = colsTreeEl.next().value as DimensionNode; //TODO: fix bfs generator type
        let repeat = 0;
        const anchorPosition = { x: col, y: row };
        const size = { width: el.leavesSize, height: 1 };
        while (repeat < el.leavesSize) {
          const isAnchor = repeat === 0;
          const cell: HeaderCell = {
            type: "ColHeader",
            currentPosition: { x: col, y: row },
            anchorPosition,
            isAnchor,
            size,
            content: String(el.value),
            id: el.key
          }
          yield cell;
          col++;
          repeat++;
        }
      }
    }
  }

  *vHeaderCells() {
    const corners = this.cornerCells();
    const colHeaders = this.colHeaderCells()

    const { width: widthCorner } = this.cornerSize;
    const { width: widthColHeader, height } = this.colHeaderSize;

    const leavesKeys = [];

    for (let row = 0; row < height; row++) {
      // 1 row from corner
      for (let col = 0; col < widthCorner; col++) {
        const cell = corners.next().value;
        leavesKeys[col] = cell.id;
        yield cell;
      }
      // 1 row from col header
      for (let col = widthCorner; col < widthCorner + widthColHeader; col++) {
        const cell = colHeaders.next().value as HeaderCell
        leavesKeys[col] = cell.id;
        yield cell;
      }

    }

    return leavesKeys;
  }

  *rowHeaderCells() {
    const { width, height } = this.rowHeaderSize;
    const { height: colHeaderHeight } = this.colHeaderSize;
    const rowsTreeEl = this.rowsTree.dfs();
    const currentRowParent: (HeaderCell | undefined)[] = new Array(width).fill(undefined);
    for (let row = colHeaderHeight; row < height + colHeaderHeight; row++) {
      for (let col = 0; col < width; col++) {
        const currentPosition = { x: col, y: row };
        if (currentRowParent[col] !== undefined) { // TODO: if exist + type guard
          const cell: HeaderCell = {
            ...(currentRowParent[col] as HeaderCell), currentPosition, isAnchor: false
          };
          yield cell;
          if (row === cell.anchorPosition.y + cell.size.height - 1) { // TODO: if last cell
            currentRowParent[col] = undefined;
          }
        } else {
          const el = rowsTreeEl.next().value as DimensionNode; //TODO: fix bfs generator type
          const size = {
            width: 1,
            height: el.leavesSize
          }
          const cell: HeaderCell = {
            type: "ColHeader",
            currentPosition,
            anchorPosition: currentPosition,
            isAnchor: true,
            size,
            content: String(el.value),
            id: el.key
          }
          if (size.height > 1) {
            currentRowParent[col] = cell;
          }

          yield cell;
        }
      }
    }
  }



  * hHeaderAndDataCells(leavesKeys: string[]): Generator<RowHeaderCell | DataCell | EmptyCell> {
    const rowHeaders = this.rowHeaderCells();
    const { height, width: rowHeaderWidth } = this.rowHeaderSize;
    const { width: fullwidth } = this.fullSize;
    //TODO: data iterator
    for (let row = 0; row < height; row++) {
      let rowLeave;
      // 1 row from rowHeader
      for (let col = 0; col < rowHeaderWidth; col++) {
        const cell = rowHeaders.next().value as RowHeaderCell; // TODO: fix casting
        yield cell;
        rowLeave = cell;
      }
      // 1 row from data
      for (let col = rowHeaderWidth; col < fullwidth; col++) {
        const rowLeafCellId = (rowLeave as HeaderCell).id;
        const key = this.factTable.makeKeyByIds(rowLeafCellId, leavesKeys[col]);
        const value = this.factTable.getByKey(key);
        const position = { x: col, y: row };
        if (value !== undefined) {
          yield {
            type: "Data",
            size: { width: 1, height: 1 },
            anchorPosition: position,
            currentPosition: position,
            content: value.toLocaleString("ru-RU"),
            isAnchor: true,
            id: key
          }
        } else {
          yield {
            type: "Empty",
            size: { width: 1, height: 1 },
            anchorPosition: position,
            currentPosition: position,
            content: "-",
            isAnchor: true,
            id: "-"
          }
        }

      }
    }
  }


  * denseCells(): Generator {
    const leavesKeys = yield* this.vHeaderCells();
    yield* this.hHeaderAndDataCells(leavesKeys);
  }

  * denseRows(): Generator<Cell[]> {
    const cellsGen = this.denseCells();
    const { height, width } = this.fullSize;
    for (let row = 0; row < height; row++) {
      const rowOfCells = [];
      for (let col = 0; col < width; col++) {
        const element = cellsGen.next().value;
        rowOfCells.push(element)
      }
      yield rowOfCells;
    }
  }

  // #endregion


  //#region other

  /**
  * Returns the cell at the given grid position.
  * Position is treated as absolute coordinates within the full grid,
  * including header zones — `(0, 0)` is the top-left corner of the table.
  */
  getCellType(col: number, row: number): CellType {
    if (col < 0 || row < 0 || col >= this.fullSize.width || row >= this.fullSize.height) {
      return "OutOfBounds";
    } else if (col < this.cornerSize.width && row < this.cornerSize.height) {
      return "Corner";
    } else if (col < this.cornerSize.width) {
      return "RowHeader";
    } else if (row < this.cornerSize.height) {
      return "ColHeader";
    } else {
      return "Data";
    }
  }

  //#endregion
}