import { beforeAll, describe, expect, test } from 'vitest';
import { PivotModel } from '../src/pivotengine/PivotModel/PivotModel'
import { config as configPopulation1 } from "./fixtures/Population1";
import { config as configPopulation2 } from "./fixtures/Population2";
import Table from "cli-table3"





describe('Population 1', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation1);
  })


  test("Compute size", () => {
    expect(model.getSize()).toStrictEqual({ width: 5, height: 10 });
  })

  // test("getColHeaderCells", () => {
  //   // const res = model.getColHeaderCells();
  //   expect(true).toBe(true);
  // })


})


describe('Population 2', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation2);
  })


  test("Compute size", () => {
    expect(model.getSize()).toStrictEqual({ width: 8, height: 11 });
  })

  // test("getColHeaderCells", () => {
  //   // const res = model.getColHeaderCells();
  //   expect(true).toBe(true);
  // })

  test("table test", () => {
    const table = new Table({ style: { head: [], border: [] } });
    // const cells = model.getAllCells();
    // cells[2] = [
    //   {
    //     content: "Russia",
    //     rowSpan: 2
    //   },
    //   {
    //     content: "Moscow",
    //   },
    // ]
    // cells[3] = [{
    //   content: "Samara",
    // },];
    // table.push(...cells);

    // console.log(table.toString());

    expect(true).toBe(true);

  })

})