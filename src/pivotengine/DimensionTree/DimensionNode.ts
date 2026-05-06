import type { FieldValue } from "../types";

export class DimensionNode {
  readonly value: FieldValue; // Country: Russia

  private readonly children: Map<FieldValue, DimensionNode> = new Map(); // City: Moscow, City: Samara
  private readonly childrenArray: DimensionNode[] = [];

  constructor(value: FieldValue) {
    this.value = value;
  }

  addChild(node: DimensionNode) {
    this.children.set(node.value, node);
    this.childrenArray.push(node);
  }

  getChildByValue(value: FieldValue) {
    return this.children.get(value);
  }

  getChildByIndex(i: number) {
    return this.childrenArray[i];
  }
}
