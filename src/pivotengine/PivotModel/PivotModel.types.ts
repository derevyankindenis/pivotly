import type { FieldObject } from "../types";

export type CellPosition = {
    x: number;
    y: number;
}

export type Size = {
    /** Count of columns */
    width: number;
    /** Count of rows */
    height: number;
}

export type CellType =
  | "Corner"
  | "RowHeader"
  | "ColHeader"
  | "Data"
  | "Empty"
  | "OutOfBounds";

export type SimpleCell = {
  /** Cell type */
  type: CellType;
}

export type BaseCell = SimpleCell & {
  /** Current position of the cell */
  currentPosition: CellPosition;
}

/** Base cell type */
export type BaseContentCell = BaseCell & {
  /** Position of the top-left cell of a merged cell range (the anchor cell) */
  anchorPosition: CellPosition;
  /** Whether this cell is the anchor cell */
  isAnchor: boolean;
  /** Cell size */
  size: Size;
  /** Text displayed inside the cell */
  content: string;
  /**
   * Unique cell identifier.
   * All cells within a merged cell share the same identifier.
   */
  id: string;
}

/** The top-left corner cell of the table */
export type CornerCell = BaseContentCell & {
  type: "Corner";
  /** Dimensions at whose intersection the cell is located */
  crossDimensions: {
    col: FieldObject,
    row: FieldObject
  }
}

export type RowHeaderCell = BaseContentCell & {
  type: "RowHeader";
}

export type ColHeaderCell = BaseContentCell & {
  type: "ColHeader";
}

/** Header cell */
export type HeaderCell = BaseContentCell & {
  type: "RowHeader" | "ColHeader";
}

/**
 * Data cell containing a number (more precisely, a formatted string).
 * A data cell is the intersection of a column dimension and a row dimension.
 */
export type DataCell = BaseContentCell & {
  type: "Data";
}

/** Cell located outside the table bounds */
export type OutOfBoundsCell = BaseCell & {
  type: "OutOfBounds"
}

/** Empty cell inside the table */
export type EmptyCell = BaseContentCell & {
  type: "Empty"
}

/** Table cell */
export type Cell = HeaderCell | CornerCell | DataCell | OutOfBoundsCell | EmptyCell;


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