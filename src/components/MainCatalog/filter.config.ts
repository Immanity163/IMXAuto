// src/components/MainCatalog/filter.config.ts
// export const COUNTRY_OPTIONS = [
//   // если в БД русские: 'Китай' | 'Корея' | 'Япония' — оставьте так
//   { label: 'Китай',  value: 'Китай'  },
//   { label: 'Корея',  value: 'Корея'  },
//   { label: 'Япония', value: 'Япония' },
// ];

// если в БД английские — раскомментируйте и закомментируйте блок выше
export const COUNTRY_OPTIONS = [
  { label: 'Китай',  value: 'China' },
  { label: 'Корея',  value: 'Korea' },
  { label: 'Япония', value: 'Japan' },
];

export const KPP_OPTIONS = [
  // значения должны совпадать с meta autokpp (или вашим ключом КПП)
  { label: 'AT',  value: 'AT'  },
  { label: 'MT',  value: 'MT'  },
  { label: 'CVT', value: 'CVT' },
  { label: 'DCT', value: 'DCT' },
];

export const DRIVE_OPTIONS = [
  { label: 'FWD', value: 'FWD' },
  { label: 'RWD', value: 'RWD' },
  { label: 'AWD', value: 'AWD' },
  { label: '4WD', value: '4WD' },
];

export const FUEL_OPTIONS = [
  // оставляю русские — судя по данным у вас “Бензин/Дизель/Гибрид/Электро”
  { label: 'Бензин',  value: 'Бензин'  },
  { label: 'Дизель',  value: 'Дизель'  },
  { label: 'Гибрид',  value: 'Гибрид'  },
  { label: 'Электро', value: 'Электро' },
];
