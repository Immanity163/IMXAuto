// src/components/MainCatalog/CatalogToolbar.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import s from './CatalogToolbar.module.scss';

const fmt = new Intl.NumberFormat('ru-RU');

type SortKey = 'new' | 'old' | 'cheap' | 'expensive';

export default function CatalogToolbar({
  total,
  sort,
  className,
}: {
  total: number;
  sort?: string | null;
  className?: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const current: SortKey =
    (['new', 'old', 'cheap', 'expensive'] as const).includes((sort ?? '') as SortKey)
      ? ((sort as SortKey) ?? 'new')
      : 'new';

  const onChange = (value: SortKey) => {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set('sort', value);
    else params.delete('sort');
    params.set('page', '1'); // при смене сортировки возвращаемся на первую страницу
    router.replace(`?${params.toString()}`);

    // мягкий скролл к началу списка
    if (typeof window !== 'undefined') {
      const top = document.querySelector('[data-catalog-top]');
      if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`${s.bar} ${className ?? ''}`}>
      <div className={s.count}>{fmt.format(total)} предложения найдено</div>

      <label className={s.sortWrap}>
        <span className="sr-only">Сортировка</span>
        <select
          className={s.select}
          value={current}
          onChange={(e) => onChange(e.target.value as SortKey)}
        >
          {/* новые/старые МАШИНЫ — сортировка по ГОДУ */}
          <option value="new">Сначала новые машины</option>
          <option value="old">Сначала старые машины</option>

          {/* цена */}
          <option value="cheap">Сначала недорогие предложения</option>
          <option value="expensive">Сначала дорогие предложения</option>
        </select>
      </label>
    </div>
  );
}
