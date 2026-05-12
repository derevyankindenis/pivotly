export type CellPosition = {
    row: number;
    col: number;
}

export type Size = {
    /** Count of columns */
    width: number;
    /** Count of rows */
    height: number;
}

// TODO: separeate for rowHeader, colHeader, corner
export type CellValue = {
    type: "value";
    value: string;
    x: number;
    y: number;
    colspan: number;
    rowspan: number;
    parentIndex: number;
    childIndex: number;
}

/** 
 * Legitimately empty cell inside the grid — e.g. when there is no data 
 * for a given row/column intersection.
 */
export type CellEmpty = {
    type: "empty";
}

/**
 * Cell requested outside the grid bounds. Returned by `getCells` when 
 * the requested rectangle extends beyond the table edges (e.g. virtualization buffer).
 */
export type OutOfBoundsCell = {
    type: 'outOfBounds';
}

// MVP: simple cell. Will be extended to discriminated union 
// (data / rowHeader / colHeader / corner) in v2.
export type Cell = CellValue | OutOfBoundsCell;


/** Pivot table model for rendering view */
export interface PivotModel {
    /** Returns the full size of the table including header zones. */
    getSize(): Size;

    /**
    * Returns the size of the headers zone.
    * - `width` — number of columns occupied by row headers (depth of row dimension tree)
    * - `height` — number of rows occupied by column headers (depth of column dimension tree)
    */
    //TODO: separate for rowsHeaderSize and colsHeaderSize ?
    //getHeadersSize(): Size;


  /**
   * Returns the cell at the given grid position.
   * Position is treated as absolute coordinates within the full grid,
   * including header zones — `(0, 0)` is the top-left corner of the table.
   * 
   * Behavior:
   * - Position is within `getSize()` bounds and has data → returns `ValueCell`
   * - Position is within bounds but has no data → returns `EmptyCell`
   * - Position is outside bounds → returns `OutOfBoundsCell`
   */
    getCell(position: CellPosition): Cell;

    /** Returns cells in the rectangle bounded by `topLeft` and `bottomRight` */
    getCells(topLeft: CellPosition, bottomRight: CellPosition): Cell[][];

    getAllCells(): Cell[][];

    // For streaming api
    // getCellsStream(topLeft, bottomRight, signal?): AsyncIterable<CellBatch>
}

//          col=0  col=1  col=2  col=3  col=4
//         ┌──────┬──────┬──────┬──────┬──────┐
//  row=0  │ corn │ corn │ COL  │ COL  │ COL  │   ← colHeader zone
//         ├──────┼──────┼──────┼──────┼──────┤
//  row=1  │ corn │ corn │ COL  │ COL  │ COL  │   ← colHeader zone
//         ├──────┼──────┼──────┼──────┼──────┤
//  row=2  │ ROW  │ ROW  │ data │ data │ data │
//         ├──────┼──────┼──────┼──────┼──────┤
//  row=3  │ ROW  │ ROW  │ data │ data │ data │
//         ├──────┼──────┼──────┼──────┼──────┤
//  row=4  │ ROW  │ ROW  │ data │ data │ data │
//         └──────┴──────┴──────┴──────┴──────┘
//          └────┬────┘  └────────┬────────┘
//          rowHeader zone     data zone