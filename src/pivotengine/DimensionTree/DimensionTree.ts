import type { Config, DataRow, FieldValue } from '../types';
import { DimensionNode } from './DimensionNode';

export class DimensionTree {
  private readonly root: DimensionNode = new DimensionNode('__root__');
  private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  addBranch(row: DataRow) {
    let parentNode = this.root;

    // this.config.forEach((axisItem) => {
    //   if (axisItem.kind === 'measures') return;
    //   const value = row[axisItem.uniqueName];
    //   const node = new DimensionNode(value as DimensionValue);
    //   parentNode.addChild(node);
    //   parentNode = node;
    // });
  }
}
