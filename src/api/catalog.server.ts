// src/api/catalog.server.ts
import 'server-only';
import type { CatalogQuery, CatalogResponse, Car } from '@/types/catalog';

/** Безопасная подстановка в GraphQL */
function esc(v: string | number) {
  if (typeof v === 'number') return String(v);
  return JSON.stringify(String(v));
}

/** Карта полей в WP */
const META_KEYS = {
  country: 'autoCountry',
  brand: 'brand',           
  model: 'automodel',       
  generation: 'autogeneration',
  drive: 'autodrive',
  fuel: 'autoFuel',
  kpp: 'autokpp',
  price: 'autoPrice',       
  engine: 'autoEngine',     
  year: 'autoYear',         
} as const;

/* ---------------- НОРМАЛИЗАЦИЯ ---------------- */
function norm(s?: string) {
  return (s ?? '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}
function toNum(v: any) {
  if (v === null || v === undefined || v === '') return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : Number(String(v).replace(',', '.')) || 0;
}

/* ------- Синонимы и сопоставления ------- */
const FUEL_ALIASES: Record<string, string[]> = {
  'бензин': ['бензин','benzin','petrol','gasoline','gas','na','ai','аи','ai95','ai-95','ai92','ai-92','95','92'],
  'дизель': ['дизель','diesel','d'],
  'гибрид': ['гибрид','hybrid','hev','phev','mhev','plug-in hybrid','plug in hybrid'],
  'электро': ['электро','электр','electric','ev','electro','bev'],
  'газ': ['газ','lpg','cng','methane','propane','gpl'],
};
function fuelMatch(carFuel: string, filterFuel?: string) {
  const f = norm(filterFuel);
  if (!f) return true;
  const c = norm(carFuel);
  if (!c) return false;
  const variants = new Set<string>([f, ...(FUEL_ALIASES[f] ?? [])].map(norm));
  for (const v of variants) if (v && c.includes(v)) return true;
  return false;
}

function countryMatch(carCountry: string, filterCountry?: string) {
  const f = norm(filterCountry);
  if (!f) return true;
  return norm(carCountry) === f;
}

function eqStr(carVal: string, filterVal?: string) {
  const f = norm(filterVal);
  if (!f) return true;
  return norm(carVal) === f;
}

function includesStr(carVal: string, filterVal?: string) {
  const f = norm(filterVal);
  if (!f) return true;
  return norm(carVal).includes(f);
}

/* ---------- Парсинг бренда/модели из title ---------- */
const TWO_WORD_BRANDS = ['alfa romeo','land rover','great wall','byd auto'];
function splitBrandModel(title?: string) {
  const t = (title ?? '').trim().replace(/\s+/g, ' ');
  if (!t) return { brand: '', model: '' };
  const tl = t.toLowerCase();
  for (const b of TWO_WORD_BRANDS) {
    if (tl.startsWith(b + ' ')) {
      return { brand: t.slice(0, b.length), model: t.slice(b.length).trim() };
    }
  }
  const [first, ...rest] = t.split(' ');
  return { brand: first ?? '', model: rest.join(' ').trim() };
}

/* --------------- ГРУЗИМ СТРАНИЦАМИ --------------- */
async function fetchCarsPage(first: number, after?: string) {
  const afterArg = after ? `, after: ${esc(after)}` : '';
  const query = `
    query CarsPage {
      cars(first: ${first}${afterArg}) {
        nodes {
          id
          title
          cars {
            ${META_KEYS.engine}
            ${META_KEYS.fuel}
            autoImage { node { sourceUrl } }
            ${META_KEYS.price}
            autoTitle
            ${META_KEYS.year}
            ${META_KEYS.country}
            autoPower
            automileage
            ${META_KEYS.drive}
            ${META_KEYS.model}
            ${META_KEYS.generation}
            ${META_KEYS.brand}
            ${META_KEYS.kpp}
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;
  const res = await fetch('https://imxauto.ru/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  });
  const json = await res.json();
  const nodes = json?.data?.cars?.nodes ?? [];
  const pageInfo = json?.data?.cars?.pageInfo ?? { hasNextPage: false, endCursor: null };
  return { nodes, pageInfo };
}

/* ---------- Маппинг узла в нашу модель ---------- */
function mapNodeToCar(n: any): Car {
  const title = n?.title || n?.cars?.autoTitle || '';
  const parsed = splitBrandModel(title);
  return {
    id: n?.id,
    country: n?.cars?.[META_KEYS.country] || '',
    title,
    price: toNum(n?.cars?.[META_KEYS.price]),
    engine: toNum(n?.cars?.[META_KEYS.engine]),
    power: n?.cars?.autoPower || '',
    mileage: toNum(n?.cars?.automileage),
    fuel: n?.cars?.[META_KEYS.fuel] || '',
    year: toNum(n?.cars?.[META_KEYS.year]),
    image: n?.cars?.autoImage?.node?.sourceUrl || '',
    drive: n?.cars?.[META_KEYS.drive] || '',
    brand: n?.cars?.[META_KEYS.brand] || parsed.brand,          
    model: n?.cars?.[META_KEYS.model] || parsed.model,          
    generation: n?.cars?.[META_KEYS.generation] || '',          
    transmission: n?.cars?.[META_KEYS.kpp] || '',
  };
}

/* ------------------ ГЛАВНАЯ ФУНКЦИЯ ------------------ */
export async function getCars(q: CatalogQuery): Promise<CatalogResponse> {
  // выправим перепутанные границы
  const query: CatalogQuery = { ...q };
  if (query.year_from && query.year_to && query.year_from > query.year_to) {
    [query.year_from, query.year_to] = [query.year_to, query.year_from];
  }
  if (query.price_from && query.price_to && query.price_from > query.price_to) {
    [query.price_from, query.price_to] = [query.price_to, query.price_from];
  }
  if (query.engine_from && query.engine_to && query.engine_from > query.engine_to) {
    [query.engine_from, query.engine_to] = [query.engine_to, query.engine_from];
  }

  // Параметры пагинации
  const limit = query.limit ?? 21;
  const page  = Math.max(1, query.page ?? 1);
  const start = (page - 1) * limit;

  // чтобы корректно посчитать total и уметь сортировать — собираем ВСЕ совпадения постранично
  const pageSize = 200;   // WPGraphQL обычно отдаёт до 100; 200 ок — вернёт макс. доступное
  const maxPages = 50;    // safety cap (≈10k)

  let after: string | undefined = undefined;
  const matched: Car[] = [];

  for (let i = 0; i < maxPages; i++) {
    const { nodes, pageInfo } = await fetchCarsPage(pageSize, after);
    for (const n of nodes) {
      const c = mapNodeToCar(n);

      // страна (WP хранит: 'japan', 'korea', 'china')
      if (!countryMatch(c.country, query.country)) continue;

      // топливо
      if (!fuelMatch(c.fuel, query.fuel)) continue;

      // КПП и привод — строгое равенство (если выбраны)
      if (!eqStr(c.transmission, query.kpp)) continue;
      if (!eqStr(c.drive,        query.drive)) continue;

      // цена/год/двигатель — числовые диапазоны
      if (query.price_from !== undefined && c.price < query.price_from) continue;
      if (query.price_to   !== undefined && c.price > query.price_to)   continue;
      if (query.year_from  !== undefined && c.year  < query.year_from)  continue;
      if (query.year_to    !== undefined && c.year  > query.year_to)    continue;
      if (query.engine_from!== undefined && (Number(c.engine) as number) < (query.engine_from as number)) continue;
      if (query.engine_to  !== undefined && (Number(c.engine) as number) > (query.engine_to   as number)) continue;

      // бренд/модель/поколение — через title/autoTitle (фоллбек)
      if (!includesStr(c.brand, query.brand)) continue;
      if (!includesStr(c.model, query.model)) continue;
      if (!includesStr(c.generation, query.generation)) continue;

      matched.push(c);
    }

    after = pageInfo?.endCursor ?? undefined;
    if (!pageInfo?.hasNextPage) break;
  }

  /* ====== СОРТИРОВКА ПЕРЕД ПАГИНАЦИЕЙ ====== */
  switch (query.sort ?? 'new') {
    case 'cheap':
      matched.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case 'expensive':
      matched.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case 'old':
      matched.sort((a, b) => (a.year ?? 0) - (b.year ?? 0)); // сначала старые машины
      break;
    case 'new':
    default:
      matched.sort((a, b) => (b.year ?? 0) - (a.year ?? 0)); // сначала новые машины
      break;
  }

  // ОБЩЕЕ КОЛИЧЕСТВО И СТРАНИЦА
  const total = matched.length;
  const items = matched.slice(start, start + limit);

  return {
    items,
    total,
    pageInfo: { hasNextPage: (start + limit) < total, endCursor: null },
  };
}
