// src/app/api/ok/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // чтобы не кэшировалось

export async function GET() {
  return NextResponse.json({ ok: true, now: Date.now() });
}
