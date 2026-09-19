import type { DimensionNode } from "../DimensionTree/DimensionNode";
import type { DimensionTree } from "../DimensionTree/DimensionTree";
import type { FactTable } from "../FactTable";
import type { SliceObject } from "../types";
import type { Cell, CornerCell, DataCell, EmptyCell, HeaderCell, RowHeaderCell } from "./PivotModel.types";
import type { SizeComputer } from "./SizeComputer";

export class PivotCellStream {

  constructor(
    private readonly sliceConfig: SliceObject,
    private readonly sizeComputer: SizeComputer,
    private readonly colsTree: DimensionTree,
    private readonly rowsTree: DimensionTree,
    private readonly factTable: FactTable
  ) { }

  *cornerCells(): Generator<CornerCell> {
    const { rows, columns } = this.sliceConfig;
    const { width, height } = this.sizeComputer.cornerSize
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
    const { width, height } = this.sizeComputer.colHeaderSize;
    for (let row = 0; row < height; row++) {
      let col = 0;
      while (col < width) {
        const el = colsTreeEl.next().value as DimensionNode; //TODO: fix bfs generator type
        let repeat = 0;
        const anchorPosition = { x: col, y: row };
        const size = { width: el.leavesCount, height: 1 };
        while (repeat < el.leavesCount) {
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

    const { width: widthCorner } = this.sizeComputer.cornerSize;
    const { width: widthColHeader, height } = this.sizeComputer.colHeaderSize;

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
    const { width, height } = this.sizeComputer.rowHeaderSize;
    const { height: colHeaderHeight } = this.sizeComputer.colHeaderSize;
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
            height: el.leavesCount
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



  *hHeaderAndDataCells(leavesKeys: string[]): Generator<RowHeaderCell | DataCell | EmptyCell> {
    const rowHeaders = this.rowHeaderCells();
    const { height, width: rowHeaderWidth } = this.sizeComputer.rowHeaderSize;
    const { width: fullwidth } = this.sizeComputer.fullSize;
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


  *cells(): Generator {
    const leavesKeys = yield* this.vHeaderCells();
    yield* this.hHeaderAndDataCells(leavesKeys);
  }

  *rows(): Generator<Cell[]> {
    const cellsGen = this.cells();
    const { height, width } = this.sizeComputer.fullSize;
    for (let row = 0; row < height; row++) {
      const rowOfCells = [];
      for (let col = 0; col < width; col++) {
        const element = cellsGen.next().value;
        rowOfCells.push(element)
      }
      yield rowOfCells;
    }
  }
}