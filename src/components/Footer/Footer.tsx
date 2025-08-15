'use client';

import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";
import React, { useState, useEffect } from 'react'; 

export default function Footer() {
    const year = new Date().getFullYear();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [WA, setWA] = useState("");
  const [TG, setTG] = useState("");

  useEffect(() => {
    fetch('https://imxauto.ru/graphql', {
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
                }
              }
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(json => {
        setPhone(json.data?.siteSettings?.nodes?.[0]?.options?.optionsPhone ?? "");
        setAddress(json.data?.siteSettings?.nodes?.[0]?.options?.optionsaddress ?? "")
        setWA(json.data?.siteSettings?.nodes?.[0]?.options?.optionsWhatsapp ?? "")
        setTG(json.data?.siteSettings?.nodes?.[0]?.options?.optionsTelegram ?? "")
      })
  }, []);

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Image
                            src="../../img/dark-logo.svg"
                            alt="IMX AUTO"
                            className={styles.logo}
                            width={200}
                            height={50}
                        />

                        <p className={styles.tagline}>
                            Автомобили из Китая,
                            <br />
                            Кореи и Японии
                        </p>
                    </div>

                    <nav className={styles.menu} aria-label="Основное меню в футере">
                        <h3 className={styles.colTitle}>Меню</h3>
                        <ul className={styles.menuList}>
                            <li><Link href="/catalog">Каталог авто</Link></li>
                            <li><Link href="/about">О компании</Link></li>
                            <li><Link href="/advantages">Преимущества</Link></li>
                            <li><Link href="/process">Этапы работы</Link></li>
                            <li><Link href="/reviews">Отзывы</Link></li>
                            <li><Link href="/contacts">Контакты</Link></li>
                        </ul>
                    </nav>

                    <address className={styles.contacts}>
                        <h3 className={styles.colTitle}>Контакты</h3>
                        <a className={styles.phone} href={`tel:${phone}`}>
                            {phone}
                        </a>
                        <p className={styles.addr}>{address}</p>
                    </address>

                    <div className={styles.messengers}>
                        <h3 className={styles.colTitle}>Мессенджеры</h3>
                        <div className={styles.msList}>
                            <Link href={`${WA}`} aria-label="WhatsApp" className={styles.msBtn}>
                            </Link>
                            <Link href={`${TG}`} aria-label="Telegram" className={styles.msBtn}>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.dev}>Разработано студией «Сопряжение»</p>

                    <div className={styles.copy}>
                        © {year} IMX AUTO{" "}
                        <Link href="/privacy" className={styles.privacy}>
                            Политика конфиденциальности
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
