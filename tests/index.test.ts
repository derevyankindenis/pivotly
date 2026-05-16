import { beforeAll, describe, expect, test } from 'vitest';
import { PivotModel } from '../src/pivotengine/PivotModel/PivotModel'
import { config as configPopulation1 } from "./fixtures/Population1";
import { config as configPopulation2, result as result2 } from "./fixtures/Population2";
import Table from "cli-table3"





describe('Population 1', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation1);
  })

  test("Compute size", () => {
    expect(model.getFullSize()).toStrictEqual({ width: 5, height: 10 });
  })

})


describe('Population 2', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation2);
  })


  test("Compute size", () => {
    expect(model.getFullSize()).toStrictEqual({ width: 8, height: 11 });
  })

  test("table test", () => {
    const table = new Table({ style: { head: [], border: [] } });
    const cells = model.getTanstakedCells();
    table.push(...cells);

    expect(table.toString().trim()).toBe(result2.trim());

  })

})