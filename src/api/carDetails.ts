'use client';

import { useEffect, useState } from "react";

export interface Car {
  id: string;
  title: string;
  autoEngine: string;
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
  autocompletionfull: string[];
  autoouter?: string;
  autoinner?: string;
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
                    autocompletionfull
                    autoouter { node { sourceUrl } }
                    autoinner { node { sourceUrl } }
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
          autocompletionfull: (c.autocompletionfull ?? "")
            .split(/\r?\n/)
            .map((s: string) => s.trim())
            .filter((s: string) => s.length > 0),
          autoouter: c.autoouter?.node?.sourceUrl ?? "",
          autoinner: c.autoinner?.node?.sourceUrl ?? "",
        });
      } catch (err) {
        console.error("Ошибка при загрузке машины:", err);
      }
    }

    fetchCar();
  }, [id]);

  return car;
}