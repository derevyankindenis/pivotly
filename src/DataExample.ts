import { type Config } from './pivotengine/types';

type RowValue = {
  year: number;
  month: number;
  day: number;
  salary: number;
  profit: number;
};

const data: RowValue[] = [
  { year: 2021, month: 1, day: 1, salary: 200, profit: 300 },
  { year: 2021, month: 1, day: 2, salary: 200, profit: 300 },
  { year: 2021, month: 1, day: 3, salary: 200, profit: 300 },
  { year: 2021, month: 2, day: 1, salary: 200, profit: 300 },
  { year: 2021, month: 2, day: 2, salary: 200, profit: 300 },
  { year: 2021, month: 2, day: 3, salary: 200, profit: 300 },
  { year: 2021, month: 3, day: 1, salary: 200, profit: 300 },
  { year: 2021, month: 3, day: 2, salary: 200, profit: 300 },
  { year: 2021, month: 3, day: 3, salary: 200, profit: 300 },
  { year: 2022, month: 1, day: 1, salary: 200, profit: 300 },
  { year: 2022, month: 1, day: 2, salary: 200, profit: 300 },
  { year: 2022, month: 1, day: 3, salary: 200, profit: 300 },
  { year: 2022, month: 2, day: 1, salary: 200, profit: 300 },
  { year: 2022, month: 2, day: 2, salary: 200, profit: 300 },
  { year: 2022, month: 2, day: 3, salary: 200, profit: 300 },
  { year: 2022, month: 3, day: 1, salary: 200, profit: 300 },
  { year: 2022, month: 3, day: 2, salary: 200, profit: 300 },
  { year: 2022, month: 3, day: 3, salary: 200, profit: 300 },
  { year: 2022, month: 1, day: 1, salary: 200, profit: 300 },
  { year: 2023, month: 1, day: 2, salary: 200, profit: 300 },
  { year: 2023, month: 1, day: 3, salary: 200, profit: 300 },
  { year: 2023, month: 2, day: 1, salary: 200, profit: 300 },
  { year: 2023, month: 2, day: 2, salary: 200, profit: 300 },
  { year: 2023, month: 2, day: 3, salary: 200, profit: 300 },
  { year: 2023, month: 3, day: 1, salary: 200, profit: 300 },
  { year: 2023, month: 3, day: 2, salary: 200, profit: 300 },
  { year: 2023, month: 3, day: 3, salary: 200, profit: 300 },
];

export const example: Config<
  RowValue,
  'month' | 'day' | 'year',
  'salary' | 'profit'
> = {
  report: {
    datasource: data,
    structure: {
      rows: ['month'],
      columns: ['year'],
    },
    fields: {
      dimensions: {
        month: {
          label: 'Month',
        },
        year: {
          label: 'Year',
        },
      },
      measures: {
        salary: {
          label: 'Salary',
        },
        profit: {
          label: 'Profit',
        },
      },
    },
  },
};
