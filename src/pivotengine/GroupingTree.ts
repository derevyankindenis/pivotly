// export class DimensionTree<TData> {
//   add(key: any, value: TData);
// }

import type { DimensionTree } from './DimensionTree/DimensionNode';

export class GroupingTree {
  readonly rowsTree: DimensionTree;

  constructor() {}
}
