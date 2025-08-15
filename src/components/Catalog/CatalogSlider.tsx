"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./CatalogSlider.module.scss";
import CarCard, { Car } from "./CarCard";

type Country = "china" | "korea" | "japan";

const tabs: { key: Country; label: string; flag: string }[] = [
  { key: "china", label: "Китай",  flag: "🇨🇳" },
  { key: "korea", label: "Корея",  flag: "🇰🇷" },
  { key: "japan", label: "Япония", flag: "🇯🇵" },
];

export default function CatalogSlider() {
  const [cars, setCars] = useState<Car[]>([]);
  const [active, setActive] = useState<Country>("china");

  const filtered = useMemo(() => cars.filter(c => c.country === active), [cars, active]);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  // Запрос к WPGraphQL
  useEffect(() => {
    async function loadCars() {
      const query = `
query GetCars {
  cars {
    nodes {
      id
      title
      cars {
        autoEngine
        autoFuel
        autoImage {
          node {
            id
            sourceUrl
          }
        }
        autoPrice
        autoTitle
        autoYear
        autoCountry
        autoPower
        automileage
      }
    }
  }
}
      `;

      const res = await fetch("https://imxauto.ru/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 } // если хочешь ISR в Next.js 13+
      });
      const json = await res.json();
      const wpCars = json.data.cars.nodes.map((car: any) => ({
 id: car.id,
  country: car.cars?.autoCountry,  
  title: car.title,
  price: Number(car.cars?.autoPrice || 0),
  engine: car.cars?.autoEngine || "",
  power: car.cars?.autoPower || 0, 
  mileage: car.cars?.autoMileage || 0,
  fuel: car.cars?.autoFuel || "",
  year: Number(car.cars?.autoYear || 0),
  image: car.cars?.autoImage?.node?.sourceUrl || "" 
      }));

      setCars(wpCars);
    }

    loadCars();
  }, []);

  // Навигация Swiper
  useEffect(() => {
    if (!swiper || swiper.destroyed) return;

    const bind = () => {
      if (!prevRef.current || !nextRef.current) return;
      const nav = swiper.params.navigation as NavigationOptions | boolean | undefined;
      if (nav && typeof nav !== "boolean") {
        nav.prevEl = prevRef.current;
        nav.nextEl = nextRef.current;
      }
      swiper.navigation?.destroy();
      swiper.navigation?.init();
      swiper.navigation?.update();
    };

    bind();
    swiper.on("breakpoint", bind);
    swiper.on("resize", bind);

    return () => {
      swiper.off("breakpoint", bind);
      swiper.off("resize", bind);
    };
  }, [swiper, active]);

  useEffect(() => {
    swiper?.slideTo(0, 0);
    swiper?.update();
  }, [active, swiper]);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">Наш каталог</h2>

        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`${styles.chip} ${active === t.key ? styles.active : ""}`}
            >
              <span className={styles.flag} aria-hidden>{t.flag}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.sliderViewport}>
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onSwiper={setSwiper}
              slidesPerView={4}
              slidesPerGroup={1}
              spaceBetween={24}
              breakpoints={{
                0:    { slidesPerView: 1, spaceBetween: 16 },
                640:  { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              speed={350}
              className={styles.swiper}
            >
              {filtered.map((car) => (
                <SwiperSlide key={car.id} className={styles.slide}>
                  <CarCard car={car} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button ref={prevRef} className={`${styles.navBtn} ${styles.prevBtn}`} aria-label="Назад" type="button">‹</button>
          <button ref={nextRef} className={`${styles.navBtn} ${styles.nextBtn}`} aria-label="Вперёд" type="button">›</button>
        </div>
      </div>
    </section>
  );
}
