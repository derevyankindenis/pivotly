import type { Cell, CellValue } from '../PivotModel/PivotModel.types';
import type { DataRow, FieldObject } from '../types';
import { DimensionNode } from './DimensionNode';

export class DimensionTree {
  private readonly root = new DimensionNode("root", "root", 0);
  private _depth = 0;

  constructor(
    private readonly sliceConfig: FieldObject[]
  ) {
  }

  insertPath(path: DataRow): DimensionNode {
    const node = this.insertPathToNode(this.root, 0, path);
    this._depth = Math.max(node.depth, this._depth);

    return node;
  }

  get depth() {
    return this._depth;
  }

  get leavesSize() {
    return this.root.getLeavesSize();
  }

  collectCells(): CellValue[][] {
    const cells: CellValue[][] = [];

    const cb = (node: DimensionNode, parentIndex: number, index: number, shift: number, leavesSize: number) => {
      const depth = node.depth - 1;
      if (depth === -1) return;

      if (!cells[depth]) {
        cells[depth] = [];
      }

      const cell: CellValue = {
        type: "value",
        value: node.value.toString(),
        x: shift,
        y: depth,
        rowspan: 1,
        colspan: leavesSize,
        parentIndex,
        childIndex: index
      };

      cells[depth].push(cell)
    }

    this.root.traverse(cb);

    return cells;
  }

  private insertPathToNode(parentNode: DimensionNode, fieldIndex: number, path: DataRow, parentKey: string = ""): DimensionNode {
    const field = this.sliceConfig[fieldIndex];
    const value = path[field.uniqueName];
    const node = parentNode.getChildByValue(value) ?? new DimensionNode(`${parentKey}/${value}`, value, fieldIndex + 1);
    parentNode.addChild(node);
    return fieldIndex >= this.sliceConfig.length - 1 ? node : this.insertPathToNode(node, fieldIndex + 1, path);
  }
}
