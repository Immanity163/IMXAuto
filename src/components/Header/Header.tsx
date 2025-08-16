'use client';

import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import Button from "../ui/Button/Button";
import ModalLead from '@/components/ModalLead/ModalLead';
import React, { useState, useEffect } from 'react';
import BurgerButton from '@/components/Burger/BurgerButton';
import BurgerMenu from '@/components/Burger/BurgerMenu';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function fetchPhone() {
      try {
        const res = await fetch('http://91.197.99.124/graphql', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query Getoptions {
                siteSettings {
                  nodes {
                    options {
                      optionsPhone
                    }
                  }
                }
              }
            `
          })
        });

        const json = await res.json();
        const phoneFromWp = json.data?.siteSettings?.nodes?.[0]?.options?.optionsPhone ?? "";
        setPhone(phoneFromWp);
      } catch (err) {
        console.error("Error fetching phone:", err);
      }
    }

    fetchPhone();
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.topRow}>
          <div className={styles.logoContainer}>
            <Link href="/">
              <Image src="/img/logo.svg" alt="IMX Auto" width={167} height={34} className={styles.logo} />
            </Link>

            <div className={styles.phone}>
              <PhoneCall size={18} />
              <span>{phone || "+7 (900) 000-00-00"}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.whatsappBtn}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.06851 20.3704L0.822483 21.3758C0.816323 21.3773 0.809887 21.3771 0.803797 21.3754C0.797707 21.3737 0.792101 21.3704 0.787534 21.3659C0.782966 21.3615 0.779576 21.3559 0.777638 21.3497C0.7757 21.3435 0.775286 21.337 0.776462 21.3306L1.66708 17.0052C1.67359 16.9733 1.66975 16.9426 1.6556 16.9131C1.53518 16.6668 1.413 16.4247 1.28906 16.1867C-0.969422 11.8524 -0.221325 6.68543 3.22792 3.20946C6.60103 -0.191179 11.9165 -0.975143 16.1484 1.26952C19.942 3.28209 22.266 7.3799 21.9756 11.7204C21.4772 19.1825 13.8793 23.9765 6.90467 21.2057C6.38764 21.0002 5.73871 20.6618 5.15882 20.3801C5.12989 20.366 5.09979 20.3627 5.06851 20.3704ZM14.4309 13.306C13.7093 13.6222 13.503 14.5878 12.5681 14.5072C12.4029 14.4924 12.1458 14.3734 11.797 14.1502C10.2861 13.1805 8.96453 12 7.83252 10.6087C7.53328 10.2408 7.45359 9.86224 7.59346 9.47306C7.88827 8.65548 8.86924 8.36228 8.41771 7.34535C8.08837 6.60303 7.75844 5.86072 7.42792 5.1184C7.17826 4.55858 6.90114 4.16171 6.26193 4.23878C6.06951 4.26239 5.86944 4.35691 5.66169 4.52226C4.95695 5.08299 4.14511 6.03877 3.98044 6.95115C3.50238 9.59974 5.45276 12.1686 7.22252 13.9332C9.38006 16.0857 12.4557 18.2852 15.6862 17.7448C16.7973 17.5588 17.6942 16.6872 18.2873 15.7331C18.5901 15.2469 18.6742 14.7153 18.2413 14.3097C18.0979 14.175 17.8098 14.0463 17.3772 13.9234C16.5869 13.7002 15.7966 13.477 15.0063 13.2537C14.821 13.2012 14.6292 13.2186 14.4309 13.306Z" fill="#FFFEFF" />
              </svg>
            </button>
            <Button variant="primary" size="lg" onClick={() => setOpen(true)}>Оставить заявку</Button>
            <div style={{ marginLeft: 'auto' }}>
              <BurgerButton
                isOpen={menuOpen}
                onToggle={() => setMenuOpen((v) => !v)}
                ariaLabel="Открыть меню"
              />
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <nav className={styles.nav}>
          <Link href="#">КАТАЛОГ АВТО</Link>
          <Link href="#">О КОМПАНИИ</Link>
          <Link href="#">ПРЕИМУЩЕСТВА</Link>
          <Link href="#">ЭТАПЫ РАБОТЫ</Link>
          <Link href="#">ОТЗЫВЫ</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">КОНТАКТЫ</Link>
        </nav>
      </div>

      <ModalLead open={open} onClose={() => setOpen(false)} />
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
