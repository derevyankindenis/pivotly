// now datasource have only one type, 
// but it has to more types 

export type FieldValue = string | number | boolean;
//TODO: | null | Date | iso Date | undefined | bigint
export type DataRow = Record<string, FieldValue>;

export interface FieldObject {
  uniqueName: string;
}

export interface MeasureObject {
  uniqueName: string;
}

export interface SliceObject {
  rows: FieldObject[];
  columns: FieldObject[];
  measures: MeasureObject[];
}

export interface Report {
  datasource: DataRow[];
  slice: SliceObject;
}

export interface Config {
  report: Report;
}


/** Strict types, but pointless */
// export interface FieldObject<T extends object> {
//   uniqueName: keyof T
// }

// export interface MeasureObject<T extends object> {
//   uniqueName: keyof T
// }

// export interface SliceObject<T extends object> {
//   rows: readonly FieldObject<T>[],
//   columns: readonly FieldObject<T>[],
//   measures: readonly MeasureObject<T>[]
// }

// export interface Report<T extends object> {
//   datasource: T[],
//   slice: SliceObject<T>
// }

// export interface Config<T extends object = object> {
//   report: Report<T>,
// }


/** More strict types
 * 
 * type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export interface NumericMeasure<T extends object> {
  uniqueName: KeysOfType<T, number>;
  aggregation: 'sum' | 'avg' | 'min' | 'max';
}

export interface UniversalMeasure<T extends object> {
  uniqueName: keyof T;
  aggregation: 'count' | 'distinctcount';
}

export type MeasureObject<T extends object> =
  | NumericMeasure<T>
  | UniversalMeasure<T>;
 * 
 * 
 */