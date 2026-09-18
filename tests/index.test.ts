import { beforeAll, describe, expect, test } from 'vitest';
import { BaseCell, PivotModel } from '../src/pivotengine/PivotModel/PivotModel'
import { config as configPopulation1 } from "./fixtures/Population1";
import { config as configPopulation2, result as result2 } from "./fixtures/Population2";
import { config as configSales } from "./fixtures/Sales";
import { config as configSales2 } from "./fixtures/Sales2";
import Table from "cli-table3"





describe('Population 1', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation1);
  })

  test("Compute size", () => {
    expect(model.fullSize).toStrictEqual({ width: 5, height: 10 });
  })

})


describe('Population 2', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation2);
  })


  test("Compute size", () => {
    expect(model.fullSize).toStrictEqual({ width: 8, height: 11 });
  })

  // test("table test", () => {
  //   const table = new Table({ style: { head: [], border: [] } });
  //   const cells = model.getTanstakedCells();
  //   table.push(...cells);

  //   const result = table.toString().trim();
  //   //console.log(result);

  //   expect(result).toBe(result2.trim());

  // })
})

describe('Test', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configSales);
  })

  // test("Sales table", () => {
  //   const table = new Table({ style: { head: [], border: [] } });
  //   const cells = model.getTanstakedCells();
  //   table.push(...cells);

  //   const result = table.toString().trim();
  //   console.log(result);

  //   expect(true).toBe(true);
  // })
})

describe('Test iterate dense matrix - population 1', () => {


  test('population 1', () => {
    const model = new PivotModel(configPopulation1);
    const cellsGen = model.denseRows();
    const table = new Table({ style: { head: [], border: [] } });

    for (const row of cellsGen) {
      table.push((row as BaseCell[]))
    }

    console.log(table.toString().trim());
    expect(true).toBe(true);
  })

  test('population 2', () => {
    const model = new PivotModel(configPopulation2);
    const cellsGen = model.denseRows();
    const table = new Table({ style: { head: [], border: [] } });

    for (const row of cellsGen) {
      table.push((row as BaseCell[]))
    }

    console.log(table.toString().trim());
    expect(true).toBe(true);
  })


  test('table test', () => {
    const table = new Table({ style: { head: [], border: [] } });
    table.push([{ content: "col1" }, { content: "col2" }, { content: "col3" }]);
    table.push({ content: "row3" });

    console.log(table.toString().trim());
    expect(true).toBe(true);

  })


})