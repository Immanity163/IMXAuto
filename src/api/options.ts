'use client';

import { useEffect, useState } from "react";

interface SiteOptions {
  phone: string;
  address: string;
  whatsapp: string;
  telegram: string;
  inn?: string;
  kpp?: string;
}

export function useSiteOptions() {
  const [options, setOptions] = useState<SiteOptions>({
    phone: "",
    address: "",
    whatsapp: "",
    telegram: "",
    inn: "",
    kpp: "",
  });

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("https://imxauto.ru/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query Getoptions {
                siteSettings {
                  nodes {
                    options {
                      optionsPhone
                      optionsaddress
                      telegram
                      whatsapp
                      optionsinn
                      optionskpp
                    }
                  }
                }
              }
            `,
          }),
        });

        const json = await res.json();
        const node = json.data?.siteSettings?.nodes?.[0]?.options ?? {};

        setOptions({
          phone: node.optionsPhone ?? "",
          address: node.optionsaddress ?? "",
          whatsapp: node.whatsapp ?? "",
          telegram: node.telegram ?? "",
          inn: node.optionsinn ?? "",
          kpp: node.optionskpp ?? "",
        });
      } catch (err) {
        console.error("Ошибка при загрузке настроек сайта:", err);
      }
    }

    fetchOptions();
  }, []);

  return options;
}


