import type { PivotModel } from "../pivotengine/PivotModel/PivotModel";
import Table from "cli-table3"
import type { CornerCell, DataCell, HeaderCell } from "../pivotengine/PivotModel/PivotModel.types";

export type LayoutMode = 'flat' | 'tabular' /** | 'compact' */;


type ContentCell = CornerCell | HeaderCell | DataCell;

export class StringRenderer {
    constructor(private readonly pivotModel: PivotModel) { }

    render(mode: LayoutMode = 'flat') {
        return ({
            'flat': this.toFlatString,
            'tabular': this.toTabularString
        })[mode]()
    }

    private toTabularString = () => {

        const table = new Table({ style: { head: [], border: [] } });

        for (const row of this.pivotModel.rows) {
            const rows = row.map(cell => {
                if (cell.type === "Empty" || cell.type === "OutOfBounds") {
                    return { content: "-" }
                } else {
                    return { content: cell.content }
                }
            })
            table.push(rows)
        }

        return table.toString().trim();
    }

    private toFlatString = () => {
        const table = new Table({ style: { head: [], border: [] } });

        for (const row of this.pivotModel.rows) {

            const cliRow: Table.Cell[] = [];

            for (const cell of row) {
                switch (cell.type) {
                    case "Empty":
                        cliRow.push("-");
                        break;
                    case "OutOfBounds":
                        cliRow.push("");
                        break;

                    default:
                        if (cell.isAnchor) {
                            cliRow.push(this.toCliCell(cell));
                        }
                        break;
                }
            }

            table.push(cliRow);
        }

        return table.toString();
    }

    private getHAlign(cell: ContentCell): Table.HorizontalAlignment {
        switch (cell.type) {
            case "Data": return "right";
            case "ColHeader": return "center";
            default: return "left";
        }
    }


    private toCliCell(cell: ContentCell): Table.Cell {
        return {
            content: cell.content,
            colSpan: cell.size.width,
            rowSpan: cell.size.height,
            hAlign: this.getHAlign(cell),
            vAlign: "center",
        };

    }
}