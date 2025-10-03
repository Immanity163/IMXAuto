'use client';

import { useEffect, useState } from "react";

export interface Car {
  id: string;
  title: string;
  autoEngine: string;
  shortDesc: string;
  autoFuel: string;
  autoImage: string;
  autoPrice: string;
  autoTitle: string;
  autoYear: string;
  autoCountry: string;
  autoPower: string;
  automileage: string;
  autodrive: string;
  automodel: string;
  autokpp: string;
  autogeneration: string;
  autoenginetype: string;
  autowheel: string;
  brand: string;
  autocomplection: string;
  autoaddimage1?: string;
  autoaddimage2?: string;
  autoaddimage3?: string;
  autoaddimage4?: string;
  autoaddimage5?: string;
  autoaddimage6?: string;
  autoaddimage7?: string;
  autoaddimage8?: string;
  autoaddimage9?: string;
  autoaddimage10?: string;
  autoaddimage11?: string;
  autoaddimage12?: string;
  autoaddimage13?: string;
  autoaddimage14?: string;
  autoaddimage15?: string;
  autoaddimage16?: string;
  autoaddimage17?: string;
  autoaddimage18?: string;
  autoaddimage19?: string;
  autoaddimage20?: string;
  autoaddimage21?: string;
  autoaddimage22?: string;
  autoaddimage23?: string;
  autoaddimage24?: string;
  autoaddimage25?: string;
  autoaddimage26?: string;
  autoaddimage27?: string;
  autoaddimage28?: string;
  autoaddimage29?: string;
  autoaddimage30?: string;
  autocompletionfull: string[];
  autoouter?: string;
  autoinner?: string;
  linkinspection?: string;
  linkinsurance?: string;
  linkcontract?: string;
}

export function useCar(id: string) {
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchCar() {
      try {
        const res = await fetch("https://imxauto.ru/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query GetCar($id: ID!) {
                car(id: $id, idType: DATABASE_ID) {
                  id
                  title
                  cars {
                    autoEngine
                    autoFuel
                    autoImage { node { sourceUrl } }
                    autoPrice
                    shortDesc
                    autoTitle
                    autoYear
                    autoCountry
                    autoPower
                    automileage
                    autodrive
                    automodel
                    autokpp
                    autogeneration
                    autoenginetype
                    autowheel
                    brand
                    autocomplection
                    autoaddimage1 { node { sourceUrl } }
                    autoaddimage2 { node { sourceUrl } }
                    autoaddimage3 { node { sourceUrl } }
                    autoaddimage4 { node { sourceUrl } }
                    autoaddimage5 { node { sourceUrl } }
                    autoaddimage6 { node { sourceUrl } }
                    autoaddimage7 { node { sourceUrl } }
                    autoaddimage8 { node { sourceUrl } }
                    autoaddimage9 { node { sourceUrl } }
                    autoaddimage10 { node { sourceUrl } }
                    autoaddimage11 { node { sourceUrl } }
                    autoaddimage12 { node { sourceUrl } }
                    autoaddimage13 { node { sourceUrl } }
                    autoaddimage14 { node { sourceUrl } }
                    autoaddimage15 { node { sourceUrl } }
                    autoaddimage16 { node { sourceUrl } }
                    autoaddimage17 { node { sourceUrl } }
                    autoaddimage18 { node { sourceUrl } }
                    autoaddimage19 { node { sourceUrl } }
                    autoaddimage20 { node { sourceUrl } }
                    autoaddimage21 { node { sourceUrl } }
                    autoaddimage22 { node { sourceUrl } }
                    autoaddimage23 { node { sourceUrl } }
                    autoaddimage25 { node { sourceUrl } }
                    autoaddimage26 { node { sourceUrl } }
                    autoaddimage27 { node { sourceUrl } }
                    autoaddimage28 { node { sourceUrl } }
                    autoaddimage29 { node { sourceUrl } }
                    autoaddimage30 { node { sourceUrl } }
                    autocompletionfull
                    autoouter { node { sourceUrl } }
                    autoinner { node { sourceUrl } }
                    linkinspection
                    linkinsurance
                    linkcontract
                  }
                }
              }
            `,
            variables: { id },
          }),
        });

        const json = await res.json();
        const data = json.data?.car;
        if (!data) return;

        const c = data.cars;

        setCar({
          id: data.id,
          title: data.title,
          autoEngine: c.autoEngine ?? "",
          shortDesc: c.shortDesc ?? "",
          autoFuel: c.autoFuel ?? "",
          autoImage: c.autoImage?.node?.sourceUrl ?? "",
          autoPrice: c.autoPrice ?? "",
          autoTitle: c.autoTitle ?? "",
          autoYear: c.autoYear ?? "",
          autoCountry: c.autoCountry ?? "",
          autoPower: c.autoPower ?? "",
          automileage: c.automileage ?? "",
          autodrive: c.autodrive ?? "",
          automodel: c.automodel ?? "",
          autokpp: c.autokpp ?? "",
          autogeneration: c.autogeneration ?? "",
          autoenginetype: c.autoenginetype ?? "",
          autowheel: c.autowheel ?? "",
          brand: c.brand ?? "",
          autocomplection: c.autocomplection ?? "",
          autoaddimage1: c.autoaddimage1?.node?.sourceUrl ?? "",
          autoaddimage2: c.autoaddimage2?.node?.sourceUrl ?? "",
          autoaddimage3: c.autoaddimage3?.node?.sourceUrl ?? "",
          autoaddimage4: c.autoaddimage4?.node?.sourceUrl ?? "",
          autoaddimage5: c.autoaddimage5?.node?.sourceUrl ?? "",
          autoaddimage6: c.autoaddimage6?.node?.sourceUrl ?? "",
          autoaddimage7: c.autoaddimage3?.node?.sourceUrl ?? "",
          autoaddimage8: c.autoaddimage4?.node?.sourceUrl ?? "",
          autoaddimage9: c.autoaddimage5?.node?.sourceUrl ?? "",
          autoaddimage10: c.autoaddimage6?.node?.sourceUrl ?? "",
          autoaddimage11: c.autoaddimage1?.node?.sourceUrl ?? "",
          autoaddimage12: c.autoaddimage2?.node?.sourceUrl ?? "",
          autoaddimage13: c.autoaddimage3?.node?.sourceUrl ?? "",
          autoaddimage14: c.autoaddimage4?.node?.sourceUrl ?? "",
          autoaddimage15: c.autoaddimage5?.node?.sourceUrl ?? "",
          autoaddimage16: c.autoaddimage6?.node?.sourceUrl ?? "",
          autoaddimage17: c.autoaddimage3?.node?.sourceUrl ?? "",
          autoaddimage18: c.autoaddimage4?.node?.sourceUrl ?? "",
          autoaddimage19: c.autoaddimage5?.node?.sourceUrl ?? "",
          autoaddimage20: c.autoaddimage6?.node?.sourceUrl ?? "",
          autoaddimage21: c.autoaddimage1?.node?.sourceUrl ?? "",
          autoaddimage22: c.autoaddimage2?.node?.sourceUrl ?? "",
          autoaddimage23: c.autoaddimage3?.node?.sourceUrl ?? "",
          autoaddimage24: c.autoaddimage4?.node?.sourceUrl ?? "",
          autoaddimage25: c.autoaddimage5?.node?.sourceUrl ?? "",
          autoaddimage26: c.autoaddimage6?.node?.sourceUrl ?? "",
          autoaddimage27: c.autoaddimage3?.node?.sourceUrl ?? "",
          autoaddimage28: c.autoaddimage4?.node?.sourceUrl ?? "",
          autoaddimage29: c.autoaddimage5?.node?.sourceUrl ?? "",
          autoaddimage30: c.autoaddimage5?.node?.sourceUrl ?? "",
          autocompletionfull: (c.autocompletionfull ?? "")
            .split(/\r?\n/)
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0),
          autoouter: c.autoouter?.node?.sourceUrl ?? "",
          autoinner: c.autoinner?.node?.sourceUrl ?? "",
          linkinspection:  c.linkinspection ?? "",
          linkinsurance: c.linkinsurance ?? "",
          linkcontract: c.linkcontract ?? "",
        });
      } catch (err) {
        console.error("Ошибка при загрузке машины:", err);
      }
    }

    fetchCar();
  }, [id]);

  return car;
}