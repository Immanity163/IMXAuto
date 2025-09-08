// src/app/catalog/page.tsx
import styles from './Catalog.module.scss';
import FilterPanel from '@/components/MainCatalog/FilterPanel';
import CarsGrid from '@/components/MainCatalog/CarsGrid';
import CatalogToolbar from '@/components/MainCatalog/CatalogToolbar';
import Pagination from '@/components/Pagination/Pagination';
import { getCars } from '@/api/catalog.server';
import type { CatalogQuery } from '@/types/catalog';

function toInt(v?: string | string[]) {
  if (v === undefined) return undefined;
  const s = Array.isArray(v) ? v[0] : v;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}
function toFloat(v?: string | string[]) {
  if (v === undefined) return undefined;
  const s = (Array.isArray(v) ? v[0] : v).replace(',', '.');
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : undefined;
}
function toStr(v?: string | string[]) {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const sp = searchParams ?? {};
  const perPage = 21;
  const page = Math.max(1, toInt(sp.page) ?? 1);

  const query: CatalogQuery = {
    country: toStr(sp.country),
    brand: toStr(sp.brand),
    model: toStr(sp.model),
    generation: toStr(sp.generation),

    price_from: toInt(sp.price_from),
    price_to: toInt(sp.price_to),

    year_from: toInt(sp.year_from),
    year_to: toInt(sp.year_to),

    engine_from: toFloat(sp.engine_from),
    engine_to: toFloat(sp.engine_to),

    drive: toStr(sp.drive),
    fuel: toStr(sp.fuel),
    kpp: toStr(sp.kpp),

    /** ВАЖНО: сортировка из URL (по умолчанию — по новизне года) */
    sort: (toStr(sp.sort) as CatalogQuery['sort']) ?? 'new',

    limit: perPage,
    page,
  };

  const { items, total } = await getCars(query);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.siteway}>
          Главная страница

          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#12161A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          Каталог авто

        </div>
        <div className={styles.title}>Каталог авто</div>
      </div>
      <div className={styles.layout} data-catalog-top>
        <aside className={styles.sidebar}>
          <FilterPanel initialQuery={query} sampleItems={items.slice(0, 50)} />
        </aside>

        <main className={styles.content}>
          <CatalogToolbar total={total ?? 0} sort={toStr(sp.sort)} />
          <CarsGrid items={items} />
        </main>
      </div>

      <Pagination page={page} perPage={perPage} total={total ?? 0} />
    </div>
  );
}
