'use client';

import cls from './Hero.module.scss';
import ModalLead from '@/components/ModalLead/ModalLead';
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button/Button';

const Hero = () => {
    const [open, setOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState('/video.mp4'); // дефолтное видео

  useEffect(() => {
    fetch('https://imxauto.ru/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetVid {
            siteSettings {
              nodes {
                options {
                  optionsVid {
                    node {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(json => {
        const vidUrl = json.data?.siteSettings?.nodes?.[0]?.options?.optionsVid?.node?.sourceUrl;
        if (vidUrl) setVideoSrc(vidUrl);
      })
  }, []);
    return (
        <section className={cls.hero}>
            <div className="container">
                <div className={cls.row}>
                    {/* Левая колонка */}
                    <div className={cls.left}>
                        <div className={cls.lead}>
                            <h1 className={cls.title}>
                                Покупка авто из-за рубежа без<br />риска и переплат
                            </h1>
                            <p className={cls.subtitle}>
                                Мы привозим автомобили из Китая, Кореи и Японии на 30% ниже рынка РФ
                            </p>

                            <div className={cls.actions}>
                                <Button className={`${cls.btn} ${cls.btnPrimary}`} onClick={() => setOpen(true)}>
                                    Оставить заявку
                                </Button>
                                <Button className={`${cls.btn} ${cls.btnSecondary}`}>
                                    Этапы работы
                                </Button>
                            </div>
                        </div>

                        <div className={cls.imageCard}>
                            <video
                                src={`${videoSrc}`} // путь к твоему видео в public/videos/
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>

                    <div className={cls.right}>
                        <div className={cls.stack}>
                            <div className={cls.benefit}>
                                <div className={cls.benefitText}>
                                    <div className={cls.benefitTitle}>Выгоднее</div>
                                    <div className={cls.benefitSub}>От 30% ниже рынка</div>
                                </div>
                                <div className={cls.badge}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8334 4.16667C10.8334 5.08714 8.78139 5.83333 6.25008 5.83333C3.71878 5.83333 1.66675 5.08714 1.66675 4.16667M10.8334 4.16667C10.8334 3.24619 8.78139 2.5 6.25008 2.5C3.71878 2.5 1.66675 3.24619 1.66675 4.16667M10.8334 4.16667V5.41667M1.66675 4.16667V14.1667C1.66675 15.0871 3.71878 15.8333 6.25008 15.8333M6.25008 9.16667C6.10963 9.16667 5.97065 9.16437 5.83341 9.15987C3.49737 9.08332 1.66675 8.3694 1.66675 7.5M6.25008 12.5C3.71878 12.5 1.66675 11.7538 1.66675 10.8333M18.3334 9.58333C18.3334 10.5038 16.2814 11.25 13.7501 11.25C11.2188 11.25 9.16675 10.5038 9.16675 9.58333M18.3334 9.58333C18.3334 8.66286 16.2814 7.91667 13.7501 7.91667C11.2188 7.91667 9.16675 8.66286 9.16675 9.58333M18.3334 9.58333V15.8333C18.3334 16.7538 16.2814 17.5 13.7501 17.5C11.2188 17.5 9.16675 16.7538 9.16675 15.8333V9.58333M18.3334 12.7083C18.3334 13.6288 16.2814 14.375 13.7501 14.375C11.2188 14.375 9.16675 13.6288 9.16675 12.7083" stroke="#FFFEFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className={cls.benefit}>
                                <div className={cls.benefitText}>
                                    <div className={cls.benefitTitle}>Быстрее</div>
                                    <div className={cls.benefitSub}>Доставляем за 3 недели</div>
                                </div>
                                <div className={cls.badge}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0001 4.99999V9.99999L13.3334 11.6667M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#FFFEFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className={cls.benefit}>
                                <div className={cls.benefitText}>
                                    <div className={cls.benefitTitle}>Удобнее</div>
                                    <div className={cls.benefitSub}>Фото и видеоотчёты</div>
                                </div>
                                <div className={cls.badge}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.66675 6.98101C1.66675 6.68908 1.66675 6.54311 1.67893 6.42017C1.79642 5.23438 2.73447 4.29632 3.92026 4.17884C4.0432 4.16666 4.19705 4.16666 4.50473 4.16666C4.62329 4.16666 4.68257 4.16666 4.7329 4.16361C5.37559 4.12469 5.93837 3.71905 6.17854 3.12166C6.19734 3.07487 6.21492 3.02213 6.25008 2.91666C6.28524 2.81118 6.30282 2.75844 6.32163 2.71166C6.56179 2.11426 7.12457 1.70863 7.76726 1.6697C7.81759 1.66666 7.87318 1.66666 7.98436 1.66666H12.0158C12.127 1.66666 12.1826 1.66666 12.2329 1.6697C12.8756 1.70863 13.4384 2.11426 13.6785 2.71166C13.6973 2.75844 13.7149 2.81118 13.7501 2.91666C13.7852 3.02213 13.8028 3.07487 13.8216 3.12166C14.0618 3.71905 14.6246 4.12469 15.2673 4.16361C15.3176 4.16666 15.3769 4.16666 15.4954 4.16666C15.8031 4.16666 15.957 4.16666 16.0799 4.17884C17.2657 4.29632 18.2037 5.23438 18.3212 6.42017C18.3334 6.54311 18.3334 6.68908 18.3334 6.98101V13.5C18.3334 14.9001 18.3334 15.6002 18.0609 16.135C17.8212 16.6054 17.4388 16.9878 16.9684 17.2275C16.4336 17.5 15.7335 17.5 14.3334 17.5H5.66675C4.26662 17.5 3.56655 17.5 3.03177 17.2275C2.56137 16.9878 2.17892 16.6054 1.93923 16.135C1.66675 15.6002 1.66675 14.9001 1.66675 13.5V6.98101Z" stroke="#FFFEFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.0001 13.75C11.841 13.75 13.3334 12.2576 13.3334 10.4167C13.3334 8.57571 11.841 7.08332 10.0001 7.08332C8.15913 7.08332 6.66675 8.57571 6.66675 10.4167C6.66675 12.2576 8.15913 13.75 10.0001 13.75Z" stroke="#FFFEFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className={cls.benefit}>
                                <div className={cls.benefitText}>
                                    <div className={cls.benefitTitle}>Надёжнее</div>
                                    <div className={cls.benefitSub}>Работаем по договору</div>
                                </div>
                                <div className={cls.badge}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6666 9.16669H6.66659M8.33325 12.5H6.66659M13.3333 5.83335H6.66659M16.6666 5.66669V14.3334C16.6666 15.7335 16.6666 16.4335 16.3941 16.9683C16.1544 17.4387 15.772 17.8212 15.3016 18.0609C14.7668 18.3334 14.0667 18.3334 12.6666 18.3334H7.33325C5.93312 18.3334 5.23306 18.3334 4.69828 18.0609C4.22787 17.8212 3.84542 17.4387 3.60574 16.9683C3.33325 16.4335 3.33325 15.7335 3.33325 14.3334V5.66669C3.33325 4.26656 3.33325 3.56649 3.60574 3.03171C3.84542 2.56131 4.22787 2.17885 4.69828 1.93917C5.23306 1.66669 5.93312 1.66669 7.33325 1.66669H12.6666C14.0667 1.66669 14.7668 1.66669 15.3016 1.93917C15.772 2.17885 16.1544 2.56131 16.3941 3.03171C16.6666 3.56649 16.6666 4.26656 16.6666 5.66669Z" stroke="#FFFEFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalLead open={open} onClose={() => setOpen(false)} />
            </div>
        </section>
    );
};

export default Hero;
