import type { AnyRow, AxisItem } from '../types';
import { DimensionNode, type DimensionValue } from './DimensionNode';

export class DimensionTree {
  private readonly root: DimensionNode = new DimensionNode('__root__');
  private readonly config: AxisItem[];

  constructor(config: AxisItem[]) {
    this.config = config;
  }

  addBranch(row: AnyRow) {
    let parentNode = this.root;

    this.config.forEach((axisItem) => {
      if (axisItem.kind === 'measures') return;
      const value = row[axisItem.uniqueName];
      const node = new DimensionNode(value as DimensionValue);
      parentNode.addChild(node);
      parentNode = node;
    });
  }
}
