import { NextResponse } from 'next/server';
import { getFilterOptions } from '@/api/catalog.server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country') || undefined;
  const brand   = searchParams.get('brand')   || undefined;
  const model   = searchParams.get('model')   || undefined;

  try {
    const dict = await getFilterOptions({ country, brand, model });
    return NextResponse.json(dict, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ countries: [], brands: [], models: [], generations: [], error: e?.message ?? 'dict_error' }, { status: 500 });
  }
}
