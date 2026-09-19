import { PivotModel } from "./pivotengine/PivotModel/PivotModel";
import type { Config } from "./pivotengine/types";
import { StringRenderer, type LayoutMode } from "./renderers/StringRenderer";

export class Pivotly {
    private readonly model: PivotModel;

    constructor(config: Config) {
        this.model = new PivotModel(config);
    }

    toString(mode: LayoutMode = 'flat') {
        const stringRenderer = new StringRenderer(this.model);
        return stringRenderer.render(mode);
    }

}