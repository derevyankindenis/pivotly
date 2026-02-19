// // TODO: Тут можно описать разные источники на вход - JSON строка, объект, массив массивов, csv и тд
// // Сейчас берем только объект JSON

// export type FieldKind = 'dimension' | 'measure';

// export type BaseField = {
//   label: string;
// };

// export interface Report<
//   T extends DataRow,
//   Dim extends keyof T,
//   Meas extends keyof T,
// > {
//   datasource: T[];
//   structure: {
//     rows: Dim[];
//     columns: Dim[];
//   };
//   fields: {
//     dimensions: Record<Dim, BaseField>;
//     measures: Record<Meas, BaseField>;
//   };
// }

// export interface Config<
//   T extends DataRow,
//   Dim extends keyof T,
//   Meas extends keyof T,
// > {
//   report: Report<T, Dim, Meas>;
// }

export type Field = {
  key: string;
  label: string;
  
}

export type DataRow = Record<string, unknown>;

export interface Report<T extends DataRow = DataRow> {
  dataSource: DataRow[];
  slice: {
    rows: 
  }
}

export interface Config<T extends DataRow = DataRow> {
  report: Report<T>;
}
