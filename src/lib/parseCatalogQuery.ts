// src/lib/parseCatalogQuery.ts
import type { CatalogQuery } from '@/types/catalog';

function first(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v;
}

function toInt(v?: string | string[]) {
  const s = first(v);
  if (!s) return undefined;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

function toFloat(v?: string | string[]) {
  const s = first(v);
  if (!s) return undefined;
  const n = parseFloat(s.replace(',', '.'));
  return Number.isFinite(n) ? n : undefined;
}

export function parseCatalogQuery(sp: Record<string, string | string[] | undefined>): CatalogQuery {
  return {
    // строковые — оставляем на будущее (страна/топливо сейчас используем)
    country: first(sp.country) || undefined,
    fuel: first(sp.fuel) || undefined,

    // остальное можно держать как есть — бек позже доделают
    brand: first(sp.brand) || undefined,
    model: first(sp.model) || undefined,
    generation: first(sp.generation) || undefined,
    drive: first(sp.drive) || undefined,
    kpp: first(sp.kpp) || undefined,

    // диапазоны — строго числа
    price_from: toInt(sp.price_from),
    price_to: toInt(sp.price_to),
    year_from: toInt(sp.year_from),
    year_to: toInt(sp.year_to),

    engine_from: toFloat(sp.engine_from),
    engine_to: toFloat(sp.engine_to),

    // лимит
    limit: toInt(sp.limit) ?? 24,
  } as CatalogQuery;
}
