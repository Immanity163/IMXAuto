'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { CatalogQuery, Car } from '@/types/catalog';
import s from './FilterPanel.module.scss';

/* Утилиты */
function uniqSorted(arr: (string | undefined)[]) {
  return Array.from(new Set(arr.filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b, 'ru'));
}
function norm(s?: string) { return (s ?? '').toString().trim().toLowerCase(); }

/* Бренд/модель с исключением для Mercedes-Benz */
const TWO_WORD_BRANDS = ['alfa romeo','land rover','great wall','byd auto','mercedes benz'];
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

/* Предзагрузка словарей из GraphQL */
const GQL = 'https://imxauto.ru/graphql';
async function fetchDictSample(first = 250) {
  const query = `
    query DictSample {
      cars(first: ${first}) {
        nodes {
          title
          cars { autoTitle autoCountry autodrive autokpp autoFuel }
        }
      }
    }
  `;
  const res = await fetch(GQL, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ query }) });
  const json = await res.json();
  const nodes = json?.data?.cars?.nodes ?? [];

  const titles: string[] = nodes.map((n: any) => n?.title || n?.cars?.autoTitle || '').filter(Boolean);
  const drives: string[] = nodes.map((n:any)=>n?.cars?.autodrive).filter(Boolean);
  const kpps: string[] = nodes.map((n:any)=>n?.cars?.autokpp).filter(Boolean);
  const fuels: string[] = nodes.map((n:any)=>n?.cars?.autoFuel).filter(Boolean);

  const brands: string[] = [];
  const models: { brand: string; model: string }[] = [];
  for (const t of titles) {
    const { brand, model } = splitBrandModel(t);
    if (brand) brands.push(brand);
    if (brand && model) models.push({ brand, model });
  }

  return {
    brands: uniqSorted(brands),
    models,
    drives: uniqSorted(drives),
    kpps: uniqSorted(kpps),
    fuels: uniqSorted(fuels),
  };
}

/* PNG-флаги из /public/flags */
const COUNTRIES = [
  { value: 'china', label: 'Китай', icon: '/flags/china.png' },
  { value: 'korea', label: 'Корея', icon: '/flags/korea.png' },
  { value: 'japan', label: 'Япония', icon: '/flags/japan.png' },
] as const;

/* Компонент */
export default function FilterPanel({
  initialQuery,
  sampleItems = [],
}: {
  initialQuery: CatalogQuery;
  sampleItems?: Car[];
}) {
  const router = useRouter();
  const sp = useSearchParams();

  // локальные значения
  const [country, setCountry] = useState(initialQuery.country ?? '');
  const [brand, setBrand] = useState(initialQuery.brand ?? '');
  const [model, setModel] = useState(initialQuery.model ?? '');
  const [generation, setGeneration] = useState(initialQuery.generation ?? '');
  const [priceFrom, setPriceFrom] = useState(initialQuery.price_from?.toString() ?? '');
  const [priceTo,   setPriceTo]   = useState(initialQuery.price_to?.toString()   ?? '');
  const [yearFrom,  setYearFrom]  = useState(initialQuery.year_from?.toString()  ?? '');
  const [yearTo,    setYearTo]    = useState(initialQuery.year_to?.toString()    ?? '');
  const [engineFrom,setEngineFrom]= useState(initialQuery.engine_from?.toString()?? '');
  const [engineTo,  setEngineTo]  = useState(initialQuery.engine_to?.toString()  ?? '');
  const [drive,     setDrive]     = useState(initialQuery.drive ?? '');
  const [fuel,      setFuel]      = useState(initialQuery.fuel ?? '');
  const [kpp,       setKpp]       = useState(initialQuery.kpp ?? '');

  // словари (из SSR-выдачи)
  const baseDict = useMemo(() => {
    const titles = sampleItems.map(i => i.title || '').filter(Boolean);
    const brands: string[] = [];
    const pairs: {brand:string, model:string}[] = [];
    for (const t of titles) {
      const { brand, model } = splitBrandModel(t);
      if (brand) brands.push(brand);
      if (brand && model) pairs.push({ brand, model });
    }
    return {
      brands: uniqSorted(brands),
      models: pairs,
      drives: uniqSorted(sampleItems.map(i=>i.drive)),
      kpps:   uniqSorted(sampleItems.map(i=>i.transmission)),
      fuels:  uniqSorted(sampleItems.map(i=>i.fuel)),
    };
  }, [sampleItems]);

  const [dict, setDict] = useState(baseDict);

  // расширить словари после монтирования
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const d = await fetchDictSample(300);
        if (!alive) return;
        setDict(prev => ({
          brands: d.brands.length ? d.brands : prev.brands,
          models: d.models.length ? d.models : prev.models,
          drives: d.drives.length ? d.drives : prev.drives,
          kpps:   d.kpps.length   ? d.kpps   : prev.kpps,
          fuels:  d.fuels.length  ? d.fuels  : prev.fuels,
        }));
      } finally {
        alive = false;
      }
    })();
    return () => { alive = false; };
  }, [baseDict]);

  // модели под выбранную марку
  const modelsForBrand = useMemo(() => {
    if (!brand) return [];
    return uniqSorted(
      dict.models.filter(m => norm(m.brand) === norm(brand)).map(m => m.model)
    );
  }, [dict.models, brand]);

  // Применить / Сброс
  const apply = () => {
    const params = new URLSearchParams(sp.toString());
    [
      'country','brand','model','generation',
      'price_from','price_to','year_from','year_to',
      'engine_from','engine_to','drive','fuel','kpp','page'
    ].forEach(k => params.delete(k));

    const set = (k: string, v?: string | number) => { if (v !== undefined && v !== '') params.set(k, String(v)); };

    set('country', country);
    set('brand', brand.trim());
    set('model', model.trim());
    set('generation', generation.trim());
    set('price_from', priceFrom ? parseInt(priceFrom, 10) : undefined);
    set('price_to',   priceTo   ? parseInt(priceTo,   10) : undefined);
    set('year_from',  yearFrom  ? parseInt(yearFrom,  10) : undefined);
    set('year_to',    yearTo    ? parseInt(yearTo,    10) : undefined);
    const ef = engineFrom.replace(',', '.'); const et = engineTo.replace(',', '.');
    set('engine_from', ef ? parseFloat(ef) : undefined);
    set('engine_to',   et ? parseFloat(et) : undefined);
    set('drive', drive);
    set('fuel', fuel);
    set('kpp', kpp);

    params.set('page','1');
    router.replace(`/catalog?${params.toString()}`);
  };

  const reset = () => {
    setCountry(''); setBrand(''); setModel(''); setGeneration('');
    setPriceFrom(''); setPriceTo(''); setYearFrom(''); setYearTo('');
    setEngineFrom(''); setEngineTo(''); setDrive(''); setFuel(''); setKpp('');
    router.replace('/catalog');
  };

  /* ------------------- СВЕРХУ: заголовок + стрелка ------------------- */
  // Состояния развёрнутости секций (по макету — по умолчанию раскрыты)
  const [openCountry, setOpenCountry] = useState(false);
  const [openAuto, setOpenAuto]       = useState(false);
  const [openPrice, setOpenPrice]     = useState(false);
  const [openSpecs, setOpenSpecs]     = useState(false);

  const SectionHeader = ({
    title,
    open,
    onToggle,
  }: { title: string; open: boolean; onToggle: () => void }) => (
    <button type="button" className={s.sectionHeader} onClick={onToggle} aria-expanded={open}>
      <span className={s.sectionTitle}>{title}</span>
      <span className={`${s.chevron} ${open ? s.chevronOpen : ''}`} aria-hidden />
    </button>
  );

  return (
    <div className={s.wrap}>
      <div className={s.h1}>Фильтр</div>

      {/* Страна */}
      <div className={s.group}>
        <SectionHeader title="Страна" open={openCountry} onToggle={() => setOpenCountry(v => !v)} />
        {openCountry && (
          <div className={s.content}>
            <div className={s.chips}>
              {COUNTRIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`${s.chip} ${country === c.value ? s.chipActive : ''}`}
                  onClick={() => setCountry(country === c.value ? '' : c.value)}
                >
                  <Image
                    src={c.icon}
                    width={18}
                    height={18}
                    alt={c.label}
                    style={{ borderRadius: 999 }}
                  />
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Автомобиль */}
      <div className={s.group}>
        <SectionHeader title="Автомобиль" open={openAuto} onToggle={() => setOpenAuto(v => !v)} />
        {openAuto && (
          <div className={s.content}>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <select className={s.select} value={brand} onChange={(e)=>{setBrand(e.target.value);setModel('');setGeneration('');}}>
                <option value="">Марка</option>
                {dict.brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select className={s.select} value={model} onChange={(e)=>{setModel(e.target.value);setGeneration('');}} disabled={!brand}>
                <option value="">Модель</option>
                {modelsForBrand.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select className={s.select} value={generation} onChange={(e)=>setGeneration(e.target.value)} disabled={!model}>
                <option value="">Поколение</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Цена */}
      <div className={s.group}>
        <SectionHeader title="Цена" open={openPrice} onToggle={() => setOpenPrice(v => !v)} />
        {openPrice && (
          <div className={s.content}>
            <div className={s.row2}>
              <input className={s.input} placeholder="От" value={priceFrom} onChange={(e)=>setPriceFrom(e.target.value.replace(/\D/g,''))}/>
              <input className={s.input} placeholder="До" value={priceTo} onChange={(e)=>setPriceTo(e.target.value.replace(/\D/g,''))}/>
            </div>
          </div>
        )}
      </div>

      {/* Характеристики */}
      <div className={s.group}>
        <SectionHeader title="Характеристики" open={openSpecs} onToggle={() => setOpenSpecs(v => !v)} />
        {openSpecs && (
          <div className={s.content}>
            <div className={s.row2}>
              <input className={s.input} placeholder="Год от" value={yearFrom} onChange={(e)=>setYearFrom(e.target.value.replace(/\D/g,''))}/>
              <input className={s.input} placeholder="До" value={yearTo} onChange={(e)=>setYearTo(e.target.value.replace(/\D/g,''))}/>
            </div>
            <div className={s.row2} style={{ marginTop: 8 }}>
              <input className={s.input} placeholder="Объём от" value={engineFrom} onChange={(e)=>setEngineFrom(e.target.value.replace(/[^0-9.,]/g,'').replace(',', '.'))}/>
              <input className={s.input} placeholder="До" value={engineTo} onChange={(e)=>setEngineTo(e.target.value.replace(/[^0-9.,]/g,'').replace(',', '.'))}/>
            </div>
            <select className={s.select} style={{ marginTop:8 }} value={kpp} onChange={(e)=>setKpp(e.target.value)}>
              <option value="">КПП</option>
              {dict.kpps.map(k=><option key={k} value={k}>{k}</option>)}
            </select>
            <select className={s.select} style={{ marginTop:8 }} value={drive} onChange={(e)=>setDrive(e.target.value)}>
              <option value="">Привод</option>
              {dict.drives.map(d=><option key={d} value={d}>{d}</option>)}
            </select>
            <select className={s.select} style={{ marginTop:8 }} value={fuel} onChange={(e)=>setFuel(e.target.value)}>
              <option value="">Топливо</option>
              {dict.fuels.map(f=><option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className={s.footer}>
        <button type="button" className={s.btnPrimary} onClick={apply}>Показать предложения</button>
        <button type="button" className={s.btnGhost} onClick={reset}>Сбросить</button>
      </div>
    </div>
  );
}
