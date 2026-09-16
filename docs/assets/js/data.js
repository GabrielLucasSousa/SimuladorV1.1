// Base Fiat Flexcare. Cada revisão é mantida separadamente e os pacotes são a soma da 1ª até a revisão escolhida.
const FLEXCARE_DATABASE = [
  {
    "id": "fiat_01",
    "brand": "Fiat",
    "model": "Fiorino",
    "name": "FIORINO 1.4",
    "year": "2022 - 2024",
    "revisions": [
      672,
      888,
      1349,
      1119,
      729,
      2654,
      672,
      945,
      1349,
      1119
    ],
    
  },
  {
    "id": "fiat_02",
    "brand": "Fiat",
    "model": "Fiorino",
    "name": "FIORINO 1.3",
    "year": "2025 - 2026",
    "revisions": [
      762,
      981,
      781,
      1911,
      820,
      1178,
      762,
      1911,
      781,
      1039
    ],
    
  },
  {
    "id": "fiat_03",
    "brand": "Fiat",
    "model": "Fiorino",
    "name": "FIORINO 1.3",
    "year": "2027",
    "revisions": [
      839,
      1039,
      839,
      1950,
      897,
      1255,
      839,
      1950,
      839,
      1097
    ],
    
  },
  {
    "id": "fiat_04",
    "brand": "Fiat",
    "model": "Strada",
    "name": "NOVA STRADA 1.3",
    "year": "2021 - 2026",
    "revisions": [
      762,
      981,
      781,
      1911,
      820,
      1020,
      762,
      1911,
      781,
      1039
    ],
    
  },
  {
    "id": "fiat_05",
    "brand": "Fiat",
    "model": "Strada",
    "name": "NOVA STRADA 1.3",
    "year": "2027",
    "revisions": [
      839,
      1039,
      839,
      1950,
      897,
      1097,
      839,
      1950,
      839,
      1097
    ],
    
  },
  {
    "id": "fiat_06",
    "brand": "Fiat",
    "model": "Strada",
    "name": "NOVA STRADA 1.4",
    "year": "2021 - 2022",
    "revisions": [
      672,
      888,
      1349,
      1119,
      729,
      2758,
      672,
      945,
      1349,
      1119
    ],
    
  },
  {
    "id": "fiat_07",
    "brand": "Fiat",
    "model": "Strada",
    "name": "NOVA STRADA 1.0T",
    "year": "2024 - 2026",
    "revisions": [
      920,
      940,
      1124,
      940,
      959,
      1777,
      920,
      940,
      1124,
      978
    ],
    
  },
  {
    "id": "fiat_08",
    "brand": "Fiat",
    "model": "Strada",
    "name": "NOVA STRADA 1.0T",
    "year": "2027",
    "revisions": [
      998,
      1017,
      1207,
      1017,
      1037,
      1841,
      998,
      1017,
      1207,
      1057
    ],
    
  },
  {
    "id": "fiat_09",
    "brand": "Fiat",
    "model": "Argo",
    "name": "ARGO 1.0",
    "year": "2021 - 2026",
    "revisions": [
      690,
      967,
      709,
      1931,
      747,
      1064,
      690,
      1931,
      709,
      1024
    ],
    
  },
  {
    "id": "fiat_10",
    "brand": "Fiat",
    "model": "Argo",
    "name": "ARGO 1.3 AT",
    "year": "2021 - 2026",
    "revisions": [
      781,
      1058,
      801,
      2221,
      839,
      1155,
      781,
      2221,
      801,
      1116
    ],
    
  },
  {
    "id": "fiat_11",
    "brand": "Fiat",
    "model": "Argo",
    "name": "ARGO 1.3",
    "year": "2027",
    "revisions": [
      839,
      1039,
      839,
      1950,
      897,
      1097,
      839,
      1950,
      839,
      1097
    ],
    
  },
  {
    "id": "fiat_12",
    "brand": "Fiat",
    "model": "Mobi",
    "name": "MOBI FIREFLY",
    "year": "2025 - 2026",
    "revisions": [
      791,
      928,
      830,
      1640,
      849,
      1361,
      791,
      1640,
      830,
      986
    ],
    
  },
  {
    "id": "fiat_13",
    "brand": "Fiat",
    "model": "Mobi",
    "name": "MOBI FIREFLY",
    "year": "2027",
    "revisions": [
      830,
      967,
      830,
      1659,
      849,
      986,
      830,
      1659,
      830,
      986
    ],
    
  },
  {
    "id": "fiat_14",
    "brand": "Fiat",
    "model": "Cronos",
    "name": "CRONOS 1.0",
    "year": "2023 - 2026",
    "revisions": [
      690,
      967,
      709,
      1931,
      747,
      1064,
      690,
      1931,
      709,
      1024
    ],
    
  },
  {
    "id": "fiat_15",
    "brand": "Fiat",
    "model": "Cronos",
    "name": "CRONOS 1.0",
    "year": "2027",
    "revisions": [
      728,
      967,
      728,
      1659,
      747,
      986,
      728,
      1659,
      728,
      986
    ],
    
  },
  {
    "id": "fiat_16",
    "brand": "Fiat",
    "model": "Cronos",
    "name": "CRONOS 1.3",
    "year": "2021 - 2026",
    "revisions": [
      781,
      1058,
      801,
      2221,
      839,
      1155,
      781,
      2221,
      801,
      1116
    ],
    
  },
  {
    "id": "fiat_17",
    "brand": "Fiat",
    "model": "Cronos",
    "name": "CRONOS 1.3",
    "year": "2027",
    "revisions": [
      839,
      1039,
      839,
      1950,
      897,
      1097,
      839,
      1950,
      839,
      1097
    ],
    
  },
  {
    "id": "fiat_18",
    "brand": "Fiat",
    "model": "Pulse",
    "name": "PULSE 1.0T AT",
    "year": "2022 - 2026",
    "revisions": [
      933,
      952,
      1136,
      952,
      971,
      1789,
      933,
      952,
      1136,
      990
    ],
    
  },
  {
    "id": "fiat_19",
    "brand": "Fiat",
    "model": "Pulse",
    "name": "PULSE 1.0T MHEV",
    "year": "2027",
    "revisions": [
      1010,
      1029,
      1213,
      1029,
      1048,
      1847,
      1010,
      1029,
      1213,
      1067
    ],
    
  },
  {
    "id": "fiat_20",
    "brand": "Fiat",
    "model": "Pulse",
    "name": "PULSE 1.3",
    "year": "2022 - 2026",
    "revisions": [
      933,
      952,
      1136,
      952,
      971,
      1789,
      933,
      952,
      1136,
      990
    ],
    
  },
  {
    "id": "fiat_21",
    "brand": "Fiat",
    "model": "Pulse",
    "name": "PULSE ABARTH 1.3T",
    "year": "2023 - 2026",
    "revisions": [
      1077,
      973,
      839,
      979,
      850,
      1768,
      839,
      979,
      839,
      985
    ],
    
  },
  {
    "id": "fiat_22",
    "brand": "Fiat",
    "model": "Pulse",
    "name": "PULSE 1.3",
    "year": "2027",
    "revisions": [
      839,
      937,
      941,
      1848,
      897,
      1097,
      839,
      1848,
      941,
      995
    ],
    
  },
  {
    "id": "fiat_23",
    "brand": "Fiat",
    "model": "Pulse",
    "name": "PULSE ABARTH 1.3T",
    "year": "2027",
    "revisions": [
      1154,
      995,
      860,
      1001,
      872,
      1789,
      860,
      1001,
      860,
      1006
    ],
    
  },
  {
    "id": "fiat_24",
    "brand": "Fiat",
    "model": "Fastback",
    "name": "FASTBACK 1.0T",
    "year": "2023 - 2026",
    "revisions": [
      933,
      952,
      1136,
      952,
      971,
      1789,
      933,
      952,
      1136,
      990
    ],
    
  },
  {
    "id": "fiat_25",
    "brand": "Fiat",
    "model": "Fastback",
    "name": "FASTBACK 1.0T MHEV",
    "year": "2027",
    "revisions": [
      1010,
      1029,
      1213,
      1029,
      1048,
      1847,
      1010,
      1029,
      1213,
      1067
    ],
    
  },
  {
    "id": "fiat_26",
    "brand": "Fiat",
    "model": "Fastback",
    "name": "FASTBACK ABARTH 1.3T",
    "year": "2023 - 2026",
    "revisions": [
      1077,
      1225,
      1077,
      1245,
      1116,
      2090,
      1077,
      1245,
      1077,
      1265
    ],
    
  },
  {
    "id": "fiat_27",
    "brand": "Fiat",
    "model": "Fastback",
    "name": "FASTBACK 1.3T",
    "year": "2027",
    "revisions": [
      1154,
      1303,
      1154,
      1323,
      1194,
      2168,
      1154,
      1323,
      1154,
      1342
    ],
    
  },
  {
    "id": "fiat_28",
    "brand": "Fiat",
    "model": "Fastback",
    "name": "FASTBACK ABARTH 1.3T",
    "year": "2027",
    "revisions": [
      1154,
      1303,
      1154,
      1323,
      1194,
      2168,
      1154,
      1323,
      1154,
      1342
    ],
    
  },
  {
    "id": "fiat_29",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 1.3T",
    "year": "2022 - 2025",
    "revisions": [
      1077,
      1225,
      1077,
      1245,
      1116,
      2187,
      1077,
      1245,
      1077,
      1265
    ],
    
  },
  {
    "id": "fiat_30",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 1.3T",
    "year": "2026",
    "revisions": [
      1401,
      1550,
      1401,
      1414,
      1440,
      2510,
      1401,
      1414,
      1401,
      1588
    ],
    
  },
  {
    "id": "fiat_31",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 1.3T",
    "year": "2027 - Atual",
    "revisions": [
      1154,
      1303,
      1154,
      1323,
      1194,
      2168,
      1154,
      1323,
      1154,
      1342
    ],
    
  },
  {
    "id": "fiat_32",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 1.3T MHEV",
    "year": "2027 - Atual",
    "revisions": [
      1154,
      1303,
      1154,
      1323,
      1194,
      2168,
      1154,
      1323,
      1154,
      1342
    ],
    
  },
  {
    "id": "fiat_33",
    "brand": "Fiat",
    "model": "Titano",
    "name": "TITANO 2.2D DW12 MT",
    "year": "2025",
    "revisions": [
      2055,
      2107,
      1731,
      2242,
      2301,
      2107,
      1731,
      4469,
      2074,
      2353
    ],
    
  },
  {
    "id": "fiat_34",
    "brand": "Fiat",
    "model": "Titano",
    "name": "TITANO 2.2D DW12 AT",
    "year": "2024 - 2025",
    "revisions": [
      2055,
      2107,
      1731,
      2242,
      2301,
      2107,
      1731,
      5331,
      2344,
      2353
    ],
    
  },
  {
    "id": "fiat_35",
    "brand": "Fiat",
    "model": "Titano",
    "name": "TITANO 2.2D DS MT",
    "year": "2026",
    "revisions": [
      1977,
      1941,
      1681,
      2076,
      1777,
      2096,
      1681,
      2076,
      1719,
      1979
    ],
    
  },
  {
    "id": "fiat_36",
    "brand": "Fiat",
    "model": "Titano",
    "name": "TITANO 2.2D DS AT",
    "year": "2026",
    "revisions": [
      1977,
      1941,
      1681,
      2076,
      1777,
      1979,
      1681,
      2076,
      1719,
      1979
    ],
    
  },
  {
    "id": "fiat_37",
    "brand": "Fiat",
    "model": "Titano",
    "name": "TITANO 2.2D DS MT",
    "year": "2027",
    "revisions": [
      2159,
      2123,
      1863,
      2258,
      1960,
      2277,
      1863,
      2258,
      1901,
      2161
    ],
    
  },
  {
    "id": "fiat_38",
    "brand": "Fiat",
    "model": "Titano",
    "name": "TITANO 2.2D DS AT",
    "year": "2027",
    "revisions": [
      2159,
      2123,
      1863,
      2258,
      1960,
      2161,
      1863,
      2258,
      1901,
      2161
    ],
    
  },
  {
    "id": "fiat_39",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 2.0 DIESEL",
    "year": "2021 - 2024",
    "revisions": [
      1745,
      1997,
      2332,
      3345,
      1804,
      2274,
      2016,
      3404,
      2060,
      1977
    ],
    
  },
  {
    "id": "fiat_40",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 2.2TD",
    "year": "2025 - 2026",
    "revisions": [
      2042,
      2290,
      2216,
      2271,
      2062,
      2368,
      2216,
      2290,
      2042,
      2271
    ],
    
  },
  {
    "id": "fiat_41",
    "brand": "Fiat",
    "model": "Toro",
    "name": "TORO 2.2TD",
    "year": "2027",
    "revisions": [
      2224,
      2473,
      2398,
      2454,
      2244,
      2550,
      2398,
      2473,
      2224,
      2454
    ],
    
  },
  {
    "id": "fiat_42",
    "brand": "Fiat",
    "model": "Scudo",
    "name": "SCUDO 1.5",
    "year": "2023 - 2024",
    "revisions": [
      2308,
      2346,
      3513,
      2540,
      2308,
      6931,
      2308,
      2346,
      3513,
      2153
    ],
    
  },
  {
    "id": "fiat_43",
    "brand": "Fiat",
    "model": "Scudo",
    "name": "e-SCUDO",
    "year": "2023",
    "revisions": [
      798,
      798,
      798,
      1578,
      798,
      798,
      798,
      1578,
      798,
      798
    ],
    
  },
  {
    "id": "fiat_44",
    "brand": "Fiat",
    "model": "Scudo",
    "name": "SCUDO 2.2D",
    "year": "2025 - Atual",
    "revisions": [
      2253,
      2627,
      2331,
      2627,
      2253,
      3941,
      2253,
      2627,
      2331,
      2627
    ],
    
  },
  {
    "id": "fiat_45",
    "brand": "Fiat",
    "model": "Ducato",
    "name": "DUCATO X250",
    "year": "2023 - 2025",
    "revisions": [
      2742,
      2742,
      2742,
      4133,
      2780,
      4144,
      2742,
      4793,
      2742,
      2780
    ],
    
  },
  {
    "id": "fiat_46",
    "brand": "Fiat",
    "model": "Ducato",
    "name": "DUCATO X250 2.2D",
    "year": "2026 - Atual",
    "revisions": [
      1903,
      2931,
      2058,
      2931,
      1903,
      4670,
      1903,
      2931,
      2058,
      2931
    ],
    
  },
  {
    "id": "fiat_47",
    "brand": "Fiat",
    "model": "500e",
    "name": "500e",
    "year": "2022",
    "revisions": [
      310,
      720,
      310,
      720,
      310,
      720,
      310,
      720,
      310,
      720
    ],
    
  }
];
const PACKAGE_NAMES = {
  1: "1ª Revisão",
  2: "2ª Revisão",
  3: "3ª Revisão",
  4: "4ª Revisão",
  5: "5ª Revisão",
  6: "6ª Revisão",
  7: "7ª Revisão",
  8: "8ª Revisão",
  9: "9ª Revisão",
  10: "10ª Revisão"
};
