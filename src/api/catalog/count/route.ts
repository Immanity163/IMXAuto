import { NextResponse } from "next/server";
import { getCars } from "@/api/catalog.server";
import type { CatalogQuery } from "@/types/catalog";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CatalogQuery> | null;
    const q: CatalogQuery = {
      country: body?.country,
      brand: body?.brand,
      model: body?.model,
      generation: body?.generation,
      drive: body?.drive,
      kpp: body?.kpp,
      fuel: body?.fuel,
      price_from: body?.price_from,
      price_to: body?.price_to,
      year_from: body?.year_from,
      year_to: body?.year_to,
      engine_from: body?.engine_from,
      engine_to: body?.engine_to,
      limit: 2000,
    } as CatalogQuery;

    const { items } = await getCars(q);
    return NextResponse.json({ count: items.length });
  } catch (e) {
    console.error("count route error:", e);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
