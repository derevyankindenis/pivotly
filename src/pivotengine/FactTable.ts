import type { DimensionNode } from "./DimensionTree/DimensionNode";
import type { FieldValue } from "./types";

export class FactTable {
    private readonly cells = new Map<string, FieldValue>();
    private readonly SEPARATOR = '\u0000';

    add(rowLeaf: DimensionNode, colLeaf: DimensionNode, value: FieldValue): void {
        const key = this.makeKey(rowLeaf, colLeaf);
        this.cells.set(key, value);
    };

    get(rowLeaf: DimensionNode, colLeaf: DimensionNode): FieldValue | undefined {
        const key = this.makeKey(rowLeaf, colLeaf);
        return this.cells.get(key);
    };

    getByKeys(rowLeafId: string, colLeafId: string): FieldValue | undefined {
        const key = this.makeKeyByIds(rowLeafId, colLeafId);// `${rowLeafId}${this.SEPARATOR}${colLeafId}`;
        console.log(key);
        return this.cells.get(key);
    }

    getByKey(key: string) {
        return this.cells.get(key);
    }

    makeKey(rowLeaf: DimensionNode, colLeaf: DimensionNode): string {
        return this.makeKeyByIds(rowLeaf.key, colLeaf.key);// `${rowLeaf.key}${this.SEPARATOR}${colLeaf.key}`;
    }

    makeKeyByIds(rowLeafId: string, colLeafId: string) {
        return `${rowLeafId}${this.SEPARATOR}${colLeafId}`;
    }

}