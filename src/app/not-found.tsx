'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.screen}>
      <section className={styles.content}>
        <div className="container">
          <div className={styles.row}>
            {/* Левая часть */}
            <div className={styles.left}>
              <div className={styles.big}>404</div>
              <h1 className={styles.title}>Страница не найдена</h1>
              <p className={styles.text}>
                Попробуйте перезагрузить страницу или вернитесь позже.
              </p>
            </div>

            <div className={styles.right}>
              <Image
                src="/img/404-car.png"        
                alt="Автомобиль"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
