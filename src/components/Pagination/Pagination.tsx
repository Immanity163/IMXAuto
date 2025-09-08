'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import s from './Pagination.module.scss';

type Props = {
  page: number;        // текущая страница (>=1)
  perPage: number;     // элементов на страницу (21)
  total: number;       // всего элементов в каталоге
  className?: string;  // опционально для внешних отступов/центрирования
};

/**
 * Рендерим номера: 1 2 3 4 … N
 * - Всегда показываем 1, 2, 3, 4 (если существуют)
 * - Всегда показываем последнюю (N)
 * - Если между 4 и N есть разрыв — показываем "…"
 * - Текущую страницу подсвечиваем
 */
export default function Pagination({ page, perPage, total, className }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const pages = useMemo(() => {
    const arr: (number | 'dots')[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
      return arr;
    }
    // 1..4
    arr.push(1, 2, 3, 4);
    // если текущая > 4 и < last - 1 — аккуратно подсветим его в наборе, но макет просит фиксированную схему
    if (totalPages > 4) arr.push('dots', totalPages);
    return arr;
  }, [totalPages]);

  const go = (p: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set('page', String(Math.min(Math.max(1, p), totalPages)));
    router.replace(`?${params.toString()}`);
    // скролл к началу каталога (если нужно)
    if (typeof window !== 'undefined') {
      const top = document.querySelector('[data-catalog-top]');
      if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={`${s.wrap} ${className ?? ''}`} aria-label="Пагинация">
      <ul className={s.list}>
        {pages.map((p, i) =>
          p === 'dots' ? (
            <li key={`dots-${i}`} className={s.dots} aria-hidden>
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => go(p)}
                className={`${s.page} ${page === p ? s.active : ''}`}
                aria-current={page === p ? 'page' : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
