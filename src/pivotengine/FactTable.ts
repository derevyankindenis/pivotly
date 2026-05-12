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

    private makeKey(rowLeaf: DimensionNode, colLeaf: DimensionNode): string {
        return `${rowLeaf.key}${this.SEPARATOR}${colLeaf.key}`;
    }
}