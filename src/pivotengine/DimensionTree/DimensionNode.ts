import type { FieldValue } from "../types";

export class DimensionNode {
  readonly _children: Map<FieldValue, DimensionNode> = new Map();
  private _leavesSize: number = 0;

  //TODO: return mutators (1. in return constructor 2. in callback 3. write to object from params)
  // create outside weakmap with mutamotrs WeakMap<node, mutators>
  constructor(readonly key: string, readonly value: FieldValue, readonly depth: number, readonly parent: DimensionNode | null = null) {
  }

// #region Mutators
  addChild(node: DimensionNode) {
    this._children.set(node.value, node);
  }

  incrementLeaves() {
    this._leavesSize++
  }
// #endregion


  hasChild(value: FieldValue) {
    return this._children.has(value);
  }

  getChildByValue(value: FieldValue) {
    return this._children.get(value);
  }

  get isLeaf() {
    return this.childrenSize === 0;
  }

  get leavesSize() {
    return this.isLeaf ? 1 : this._leavesSize;
  }

  get childrenSize() {
    return this._children.size
  }

  get children() {
    return this._children.values()
  }

  traverse(cb: TraverseCallback, parentIndex: number = 0, index: number = 0, shift: number = 0) {
    let childIndex = 0;
    let leavesSize = 0;

    this._children.forEach(child => {
      child.traverse(cb, index, childIndex, shift + leavesSize);
      leavesSize += child.leavesSize;
      childIndex++;
    })

    cb(this, parentIndex, index, shift);
  }
}

type TraverseCallback = (node: DimensionNode, parentIndex: number, index: number, shift: number) => void;
