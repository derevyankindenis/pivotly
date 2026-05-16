const data = [
  { "country": "Russia", "city": "Moscow", "year": 2016, "month": "January", "population": 12300000 },
  { "country": "Russia", "city": "Moscow", "year": 2016, "month": "July", "population": 12330000 },
  { "country": "Russia", "city": "Moscow", "year": 2017, "month": "January", "population": 12470000 },
  { "country": "Russia", "city": "Moscow", "year": 2017, "month": "July", "population": 12500000 },
  { "country": "Russia", "city": "Moscow", "year": 2018, "month": "January", "population": 12620000 },
  { "country": "Russia", "city": "Moscow", "year": 2018, "month": "July", "population": 12655000 },

  { "country": "Russia", "city": "Samara", "year": 2016, "month": "January", "population": 5260000 },
  { "country": "Russia", "city": "Samara", "year": 2016, "month": "July", "population": 5280000 },
  { "country": "Russia", "city": "Samara", "year": 2017, "month": "January", "population": 5320000 },
  { "country": "Russia", "city": "Samara", "year": 2017, "month": "July", "population": 5350000 },
  { "country": "Russia", "city": "Samara", "year": 2018, "month": "January", "population": 5360000 },
  { "country": "Russia", "city": "Samara", "year": 2018, "month": "July", "population": 5380000 },

  { "country": "Russia", "city": "Novosibirsk", "year": 2016, "month": "January", "population": 1570000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2016, "month": "July", "population": 1580000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2017, "month": "January", "population": 1590000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2017, "month": "July", "population": 1600000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2018, "month": "January", "population": 1610000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2018, "month": "July", "population": 1620000 },

  { "country": "USA", "city": "New York", "year": 2016, "month": "January", "population": 8510000 },
  { "country": "USA", "city": "New York", "year": 2016, "month": "July", "population": 8540000 },
  { "country": "USA", "city": "New York", "year": 2017, "month": "January", "population": 8590000 },
  { "country": "USA", "city": "New York", "year": 2017, "month": "July", "population": 8620000 },
  { "country": "USA", "city": "New York", "year": 2018, "month": "January", "population": 8410000 },
  { "country": "USA", "city": "New York", "year": 2018, "month": "July", "population": 8390000 },

  { "country": "USA", "city": "Los Angeles", "year": 2016, "month": "January", "population": 3960000 },
  { "country": "USA", "city": "Los Angeles", "year": 2016, "month": "July", "population": 3970000 },
  { "country": "USA", "city": "Los Angeles", "year": 2017, "month": "January", "population": 3980000 },
  { "country": "USA", "city": "Los Angeles", "year": 2017, "month": "July", "population": 3990000 },
  { "country": "USA", "city": "Los Angeles", "year": 2018, "month": "January", "population": 3970000 },
  { "country": "USA", "city": "Los Angeles", "year": 2018, "month": "July", "population": 3960000 },

  { "country": "USA", "city": "Chicago", "year": 2016, "month": "January", "population": 2715000 },
  { "country": "USA", "city": "Chicago", "year": 2016, "month": "July", "population": 2710000 },
  { "country": "USA", "city": "Chicago", "year": 2017, "month": "January", "population": 2705000 },
  { "country": "USA", "city": "Chicago", "year": 2017, "month": "July", "population": 2700000 },
  { "country": "USA", "city": "Chicago", "year": 2018, "month": "January", "population": 2702000 },
  { "country": "USA", "city": "Chicago", "year": 2018, "month": "July", "population": 2705000 },

  { "country": "Germany", "city": "Berlin", "year": 2016, "month": "January", "population": 3650000 },
  { "country": "Germany", "city": "Berlin", "year": 2016, "month": "July", "population": 3670000 },
  { "country": "Germany", "city": "Berlin", "year": 2017, "month": "January", "population": 3685000 },
  { "country": "Germany", "city": "Berlin", "year": 2017, "month": "July", "population": 3700000 },
  { "country": "Germany", "city": "Berlin", "year": 2018, "month": "January", "population": 3725000 },
  { "country": "Germany", "city": "Berlin", "year": 2018, "month": "July", "population": 3750000 },

  { "country": "Germany", "city": "Hamburg", "year": 2016, "month": "January", "population": 1800000 },
  { "country": "Germany", "city": "Hamburg", "year": 2016, "month": "July", "population": 1810000 },
  { "country": "Germany", "city": "Hamburg", "year": 2017, "month": "January", "population": 1820000 },
  { "country": "Germany", "city": "Hamburg", "year": 2017, "month": "July", "population": 1830000 },
  { "country": "Germany", "city": "Hamburg", "year": 2018, "month": "January", "population": 1835000 },
  { "country": "Germany", "city": "Hamburg", "year": 2018, "month": "July", "population": 1840000 },

  { "country": "Germany", "city": "Munich", "year": 2016, "month": "January", "population": 1445000 },
  { "country": "Germany", "city": "Munich", "year": 2016, "month": "July", "population": 1450000 },
  { "country": "Germany", "city": "Munich", "year": 2017, "month": "January", "population": 1455000 },
  { "country": "Germany", "city": "Munich", "year": 2017, "month": "July", "population": 1460000 },
  { "country": "Germany", "city": "Munich", "year": 2018, "month": "January", "population": 1465000 },
  { "country": "Germany", "city": "Munich", "year": 2018, "month": "July", "population": 1470000 }
]

export const config = {
  report: {
    datasource: data,
    slice: {
      rows: [{ uniqueName: "country" }, { uniqueName: "city" }],
      columns: [{ uniqueName: "year" }, { uniqueName: "month" }],
      measures: [{ uniqueName: "people" }]
    },
  },
};

export const result = `
┌─────────┬───────────────────┬─────────────────────────┬─────────────────────────┬─────────────────────────┐
│         │                   │          2016           │          2017           │          2018           │
│ Country │      City         ├────────────┬────────────┼────────────┬────────────┼────────────┬────────────┤
│         │                   │  January   │    July    │  January   │    July    │  January   │    July    │
├─────────┼───────────────────┼────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│ Russia  │ Moscow            │ 12 300 000 │ 12 330 000 │ 12 470 000 │ 12 500 000 │ 12 620 000 │ 12 655 000 │
│         │ Samara            │  5 260 000 │  5 280 000 │  5 320 000 │  5 350 000 │  5 360 000 │  5 380 000 │
│         │ Novosibirsk       │  1 570 000 │  1 580 000 │  1 590 000 │  1 600 000 │  1 610 000 │  1 620 000 │
├─────────┼───────────────────┼────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│ USA     │ New York          │  8 510 000 │  8 540 000 │  8 590 000 │  8 620 000 │  8 410 000 │  8 390 000 │
│         │ Los Angeles       │  3 960 000 │  3 970 000 │  3 980 000 │  3 990 000 │  3 970 000 │  3 960 000 │
│         │ Chicago           │  2 715 000 │  2 710 000 │  2 705 000 │  2 700 000 │  2 702 000 │  2 705 000 │
├─────────┼───────────────────┼────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│ Germany │ Berlin            │  3 650 000 │  3 670 000 │  3 685 000 │  3 700 000 │  3 725 000 │  3 750 000 │
│         │ Hamburg           │  1 800 000 │  1 810 000 │  1 820 000 │  1 830 000 │  1 835 000 │  1 840 000 │
│         │ Munich            │  1 445 000 │  1 450 000 │  1 455 000 │  1 460 000 │  1 465 000 │  1 470 000 │
└─────────┴───────────────────┴────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘
`;