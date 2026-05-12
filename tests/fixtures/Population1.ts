const data = [
  { "country": "Russia", "city": "Moscow", "year": 2016, "people": 12330000 },
  { "country": "Russia", "city": "Moscow", "year": 2017, "people": 12500000 },
  { "country": "Russia", "city": "Moscow", "year": 2018, "people": 12655000 },
  { "country": "Russia", "city": "Saint Petersburg", "year": 2016, "people": 5280000 },
  { "country": "Russia", "city": "Saint Petersburg", "year": 2017, "people": 5350000 },
  { "country": "Russia", "city": "Saint Petersburg", "year": 2018, "people": 5380000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2016, "people": 1580000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2017, "people": 1600000 },
  { "country": "Russia", "city": "Novosibirsk", "year": 2018, "people": 1620000 },

  { "country": "USA", "city": "New York", "year": 2016, "people": 8540000 },
  { "country": "USA", "city": "New York", "year": 2017, "people": 8620000 },
  { "country": "USA", "city": "New York", "year": 2018, "people": 8390000 },
  { "country": "USA", "city": "Los Angeles", "year": 2016, "people": 3970000 },
  { "country": "USA", "city": "Los Angeles", "year": 2017, "people": 3990000 },
  { "country": "USA", "city": "Los Angeles", "year": 2018, "people": 3960000 },
  { "country": "USA", "city": "Chicago", "year": 2016, "people": 2710000 },
  { "country": "USA", "city": "Chicago", "year": 2017, "people": 2700000 },
  { "country": "USA", "city": "Chicago", "year": 2018, "people": 2705000 },

  { "country": "Germany", "city": "Berlin", "year": 2016, "people": 3670000 },
  { "country": "Germany", "city": "Berlin", "year": 2017, "people": 3700000 },
  { "country": "Germany", "city": "Berlin", "year": 2018, "people": 3750000 },
  { "country": "Germany", "city": "Hamburg", "year": 2016, "people": 1810000 },
  { "country": "Germany", "city": "Hamburg", "year": 2017, "people": 1830000 },
  { "country": "Germany", "city": "Hamburg", "year": 2018, "people": 1840000 },
  { "country": "Germany", "city": "Munich", "year": 2016, "people": 1450000 },
  { "country": "Germany", "city": "Munich", "year": 2017, "people": 1460000 },
  { "country": "Germany", "city": "Munich", "year": 2018, "people": 1470000 }
]

export const config = {
  report: {
    datasource: data,
    slice: {
      rows: [{ uniqueName: "country" }, { uniqueName: "city" }],
      columns: [{ uniqueName: "year" }],
      measures: [{ uniqueName: "people" }]
    },
  },
};


/**
 

┌─────────┬───────────────────┬────────────┬────────────┬────────────┐
│ Country │ City              │    2016    │    2017    │    2018    │
├─────────┼───────────────────┼────────────┼────────────┼────────────┤
│ Russia  │ Moscow            │ 12 330 000 │ 12 500 000 │ 12 655 000 │
│         │ Saint Petersburg  │  5 280 000 │  5 350 000 │  5 380 000 │
│         │ Novosibirsk       │  1 580 000 │  1 600 000 │  1 620 000 │
├─────────┼───────────────────┼────────────┼────────────┼────────────┤
│ USA     │ New York          │  8 540 000 │  8 620 000 │  8 390 000 │
│         │ Los Angeles       │  3 970 000 │  3 990 000 │  3 960 000 │
│         │ Chicago           │  2 710 000 │  2 700 000 │  2 705 000 │
├─────────┼───────────────────┼────────────┼────────────┼────────────┤
│ Germany │ Berlin            │  3 670 000 │  3 700 000 │  3 750 000 │
│         │ Hamburg           │  1 810 000 │  1 830 000 │  1 840 000 │
│         │ Munich            │  1 450 000 │  1 460 000 │  1 470 000 │
└─────────┴───────────────────┴────────────┴────────────┴────────────┘

  
 */