import Table from "cli-table3"
import { Cell, CornerCell, DataCell, HeaderCell } from "../src/pivotengine/PivotModel/PivotModel.types";


type ContentCell = CornerCell | HeaderCell | DataCell;


function getHAlign(cell: ContentCell): Table.HorizontalAlignment {
  switch (cell.type) {
    case "Data":      return "right"; 
    case "ColHeader": return "center"; 
    default:          return "left";   
  }
}


function toCliCell(cell: ContentCell): Table.Cell {
  return {
    content: cell.content,
    colSpan: cell.size.width,
    rowSpan: cell.size.height,
    hAlign: getHAlign(cell),
    vAlign: "center",
  };
}


type DenseRows = Generator<Cell[]>

export function denseMatrixToCliTable(tableRows: DenseRows): string {

  const table = new Table({ style: { head: [], border: [] } });

  let expectedWidth: number | undefined;

  for (const row of tableRows) {
    if (expectedWidth === undefined) {
      expectedWidth = row.length;
    } else if (row.length !== expectedWidth) {
      throw new Error(
        `Неконсистентная ширина строки: ожидалось ${expectedWidth}, получено ${row.length}`
      );
    }

    const cliRow: Table.Cell[] = [];

    for (const cell of row) {
      switch (cell.type) {
        case "Empty":
        case "OutOfBounds":
          cliRow.push("");
          break;

        default:
          if (cell.isAnchor) {
            cliRow.push(toCliCell(cell));
          }
          break;
      }
    }

    table.push(cliRow);
  }

  return table.toString();
}