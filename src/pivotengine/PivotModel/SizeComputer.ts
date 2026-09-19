import type { DimensionTree } from "../DimensionTree/DimensionTree";
import type { Size } from "./PivotModel.types";

export class SizeComputer {

    constructor(
        private readonly colsTree: DimensionTree,
        private readonly rowsTree: DimensionTree
    ) {

    }

    get colHeaderSize(): Size {
        return {
            width: this.colsTree.leavesCount,
            height: this.colsTree.depth
        }
    }

    get rowHeaderSize(): Size {
        return {
            width: this.rowsTree.depth,
            height: this.rowsTree.leavesCount
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
}