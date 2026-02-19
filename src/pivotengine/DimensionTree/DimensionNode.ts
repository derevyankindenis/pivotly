export type DimensionValue = string | number | boolean | null;

export class DimensionNode {
  readonly value: DimensionValue; // Country: Russia

  private readonly children: Map<DimensionValue, DimensionNode> = new Map(); // City: Moscow, City: Samara
  private readonly childrenArray: DimensionNode[] = [];

  constructor(value: DimensionValue) {
    this.value = value;
  }

  addChild(node: DimensionNode) {
    this.children.set(node.value, node);
    this.childrenArray.push(node);
  }

  getChildByValue(value: DimensionValue) {
    return this.children.get(value);
  }

  getChildByIndex(i: number) {
    return this.childrenArray[i];
  }
}
