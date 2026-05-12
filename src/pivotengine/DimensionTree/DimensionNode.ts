import type { FieldValue } from "../types";

export class DimensionNode {
  private readonly children: Map<FieldValue, DimensionNode> = new Map();

  constructor(readonly key: string, readonly value: FieldValue, readonly depth: number) { }

  addChild(node: DimensionNode) {
    this.children.set(node.value, node);
  }

  hasChild(value: FieldValue) {
    return this.children.has(value);
  }

  getChildByValue(value: FieldValue) {
    return this.children.get(value);
  }

  getChildrenSize() {
    return this.children.size
  }

  isLeaf() {
    return this.getChildrenSize() === 0;
  }

  getLeavesSize() {
    if (this.children.size === 0) return 1;

    let size = 0;
    this.children.forEach(child => {
      size += child.getLeavesSize();
    })
    return size;
  }

  traverse(cb: TraverseCallback, parentIndex: number = 0, index: number = 0, shift: number = 0): number {
    let childIndex = 0;
    let leavesSize = 0;

    this.children.forEach(child => {
      const lastLeaves = child.traverse(cb, index, childIndex, shift + leavesSize);
      leavesSize += lastLeaves;
      childIndex++;
    })

    const resultLeavesSize = this.isLeaf() ? 1 : leavesSize;
    cb(this, parentIndex, index, shift, resultLeavesSize);

    return resultLeavesSize;
  }
}

type TraverseCallback = (node: DimensionNode, parentIndex: number, index: number, shift: number, leavesSize: number) => void;
