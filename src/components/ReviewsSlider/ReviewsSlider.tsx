"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { NavigationOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./ReviewsSlider.module.scss";

type Review = {
  name: string;
  avatar: string;
  text: string;
};

export default function ReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    async function loadReviews() {
      const query = `
        query GetReviews {
  reviews {
    nodes {
      id
      title
      reviews {
        reviewName
        reviewText
        reviewAvatar{
					node{
            sourceUrl
          }
        }
        reviewPhoto1{
          					node{
            sourceUrl
          }
        }
      }
    }
  }
}
      `;

      const res = await fetch("https://imxauto.ru/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
      });

      const json = await res.json();

      const wpReviews: Review[] = json.data.reviews.nodes.map((r: any) => ({
        name: r.reviews?.reviewName || "",
        text: r.reviews?.reviewText || "",
        avatar: r.reviews?.reviewAvatar?.node?.sourceUrl || "",
      }));

      setReviews(wpReviews);
    }

    loadReviews();
  }, []);

  // Навигация Swiper
  useEffect(() => {
    if (!swiper) return;

    const bindNavigation = () => {
      if (!prevRef.current || !nextRef.current) return;

      const params = swiper.params.navigation as NavigationOptions | boolean;

      if (params && typeof params !== "boolean") {
        params.prevEl = prevRef.current;
        params.nextEl = nextRef.current;
      }

      if (swiper.navigation) {
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      }
    };

    bindNavigation();
    const raf = requestAnimationFrame(bindNavigation);

    const handle = () => bindNavigation();
    swiper.on("breakpoint", handle);
    swiper.on("resize", handle);

    return () => {
      cancelAnimationFrame(raf);
      swiper.off("breakpoint", handle);
      swiper.off("resize", handle);
    };
  }, [swiper]);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="section-title">Отзывы покупателей</h2>

        <div className={styles.sliderWrapper}>
          <div className={styles.sliderViewport}>
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: null, nextEl: null }}
              onSwiper={setSwiper}
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 18 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              watchSlidesProgress
              speed={400}
              className={styles.swiper}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.avatar} className={styles.slide}>
                  <article className={styles.card}>
                    <header className={styles.header}>
                      <img src={review.avatar} alt={review.name} className={styles.avatar} />
                      <div>
                        <h3 className={styles.name}>{review.name}</h3>
                        <div className={styles.rating}>{"★".repeat(5)} <span>5.0</span></div>
                      </div>
                    </header>
                    <p className={styles.text}>{review.text}</p>
                    <div className={styles.photos}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={styles.photoPlaceholder} />
                      ))}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            ref={prevRef}
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label="Назад"
            type="button"
          >
            ‹
          </button>
          <button
            ref={nextRef}
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label="Вперёд"
            type="button"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
