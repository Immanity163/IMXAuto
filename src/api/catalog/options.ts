// src/pages/api/catalog/options.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFilterOptions } from '@/api/catalog.server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const country = (req.query.country as string) || undefined;
    const brand   = (req.query.brand as string)   || undefined;
    const model   = (req.query.model as string)   || undefined;

    const dict = await getFilterOptions({ country, brand, model });
    return res.status(200).json(dict);
  } catch (e: any) {
    return res.status(500).json({ countries: [], brands: [], models: [], generations: [], error: e?.message ?? 'dict_error' });
  }
}
