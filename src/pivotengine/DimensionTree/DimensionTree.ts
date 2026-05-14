import type { DataRow, FieldObject } from '../types';
import { DimensionNode } from './DimensionNode';

export type VisitedNode = {
  node: DimensionNode;
  shift: number;
  depth: number;
  parentIndex: number;
  childIndex: number;
  leavesSize: number;
}

export type VisitNodeCb = (node: VisitedNode) => void;

export type VisitDfs = { node: DimensionNode; childIndex: number }

export class DimensionTree {
  private readonly root = new DimensionNode("root", "root", 0);
  private _depth = 0;

  constructor(
    private readonly sliceConfig: FieldObject[]
  ) {
  }

  insertPath(path: DataRow): DimensionNode {
    const { node } = this.insertPathToNode(this.root, 0, path);
    this._depth = Math.max(node.depth, this._depth);
    return node;
  }

  get depth() {
    return this._depth;
  }

  get leavesSize() {
    return this.root.leavesSize;
  }

  traverse(visitNodeCb: VisitNodeCb) {

    const cb = (node: DimensionNode, parentIndex: number, childIndex: number, shift: number) => {
      const depth = node.depth - 1;
      if (depth === -1) return;

      const visitedNode: VisitedNode = {
        node,
        shift,
        depth,
        leavesSize: node.leavesSize,
        parentIndex,
        childIndex
      }

      visitNodeCb(visitedNode);
    }

    this.root.traverse(cb);
  }

  *bfs() {
    const queue: DimensionNode[] = [...this.root.children];
    let head = 0;

    while (head < queue.length) {
      const node = queue[head++];
      yield node;
      queue.push(...node.children); // TODO: add inerator to stack, not elements
    }
  }

  dfs() {
    return this._dfs(this.root);
  }

  private *_dfs(node: DimensionNode, childIndex: number = 0): Generator<VisitDfs> {
    if (node !== this.root) yield { node, childIndex };
    let indexChild = 0;
    for (const childNode of node.children) {
      yield* this._dfs(childNode, indexChild);
      indexChild++
    }
  }

  private insertPathToNode(parentNode: DimensionNode, fieldIndex: number, path: DataRow, parentKey: string = ""): { node: DimensionNode, leafCreated: boolean } {
    const field = this.sliceConfig[fieldIndex];
    const value = path[field.uniqueName];
    let childNode = parentNode.getChildByValue(value)
    let leafCreated = false;
    if (!childNode) {
      childNode = new DimensionNode(`${parentKey}/${value}`, value, fieldIndex + 1, parentNode);
      parentNode.addChild(childNode);
      leafCreated = true;
    }
    if (fieldIndex >= this.sliceConfig.length - 1) {
      leafCreated && parentNode.incrementLeaves();
      return { node: childNode, leafCreated }
    } else {
      const { node, leafCreated } = this.insertPathToNode(childNode, fieldIndex + 1, path);
      leafCreated && parentNode.incrementLeaves();
      return { node, leafCreated }
    }
  }
}
