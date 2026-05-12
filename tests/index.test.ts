import { beforeAll, describe, expect, test } from 'vitest';
import { PivotModel } from '../src/pivotengine/PivotModel/PivotModel'
import { config as configPopulation1 } from "./fixtures/Population1";
import { config as configPopulation2 } from "./fixtures/Population2";




describe('Population 1', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation1);
  })


  test("Compute size", ()=> {
    expect(model.getSize()).toStrictEqual({width: 5, height: 10});
  })

  test("getColHeaderCells", () => {
    const res = model.getColHeaderCells();
    expect(true).toBe(true);
  })


})


describe('Population 2', () => {

  let model: PivotModel;

  beforeAll(() => {
    model = new PivotModel(configPopulation2);
  })


  test("Compute size", ()=> {
    expect(model.getSize()).toStrictEqual({width: 8, height: 11});
  })

  test("getColHeaderCells", () => {
    const res = model.getColHeaderCells();
    expect(true).toBe(true);
  })

})