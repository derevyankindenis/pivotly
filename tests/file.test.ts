import { describe, expect, test } from 'vitest';
import { config as configPopulation1 } from "./fixtures/Population1";
import { config as configPopulation2 } from "./fixtures/Population2";
import { config as configSales } from "./fixtures/Sales";
import { config as configSales2 } from "./fixtures/Sales2";
import { Pivotly } from '../src/Pivotly';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Config } from '../src/pivotengine/types';

/** This is not an assertion, just a helper output for quick manual debugging of the render:
 each test overwrites the same file with the rendered table
 so it can be visually inspected in the editor. */

const debugDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '__debug__');
const debugFilePath = path.join(debugDir, 'result.txt');

const writeDense = async (config: Config) => {
    const resultTable = createTableDense(config);
    await fs.mkdir(debugDir, { recursive: true });
    await fs.writeFile(debugFilePath, resultTable);
}

const writeSparse = async (config: Config) => {
    const resultTable = createTableSparse(config);
    await fs.mkdir(debugDir, { recursive: true });
    await fs.writeFile(debugFilePath, resultTable);
}

const createTableDense = (config: Config) => {
    const pivotly = new Pivotly(config);
    return pivotly.toString('tabular');
}

const createTableSparse = (config: Config) => {
    const pivotly = new Pivotly(config);
    return pivotly.toString('flat');
}

describe('Write file', () => {

    test('population 1', async () => {
        writeDense(configPopulation1)
        expect(true).toBe(true);
    });

    test('population 2', async () => {
        writeDense(configPopulation2)
        expect(true).toBe(true);
    });

    test('sales 1 ', async () => {
        writeDense(configSales)
        expect(true).toBe(true);
    });

    test('sales 2 ', async () => {
        writeDense(configSales2)
        expect(true).toBe(true);
    });

});


describe("sparse test", () => {
    test('population 1', async () => {
        writeSparse(configPopulation1)
        expect(true).toBe(true);
    });

    test('population 2', async () => {
        writeSparse(configPopulation2)
        expect(true).toBe(true);
    });

    test('sales 1 ', async () => {
        writeSparse(configSales)
        expect(true).toBe(true);
    });

    test('sales 2 ', async () => {
        writeSparse(configSales2)
        expect(true).toBe(true);
    });
})