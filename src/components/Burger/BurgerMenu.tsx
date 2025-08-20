'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import cls from './BurgerMenu.module.scss';
import ModalLead from '@/components/ModalLead/ModalLead';


type Props = {
    open: boolean;
    onClose: () => void;
};

export default function BurgerMenu({ open, onClose }: Props) {
    const [openModal, setOpenModal] = useState(false);

     // site settings from GraphQL
      const [sitePhone, setSitePhone] = useState('');
      const [siteAddress, setSiteAddress] = useState('');
      const [whatsapp, setWhatsapp] = useState('');
      const [telegram, setTelegram] = useState('');
    
    
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
                      whatsapp
                      telegram
                    }
                  }
                }
              }
            `
          })
        })
          .then(res => res.json())
          .then(json => {
            const opts = json.data?.siteSettings?.nodes?.[0]?.options;
            setSitePhone(opts?.optionsPhone ?? '');
            setSiteAddress(opts?.optionsaddress ?? '');
            setWhatsapp(opts?.whatsapp ?? '');
            setTelegram(opts?.telegram ?? '');
          });
      }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className={cls.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div id="burger-menu-modal" className={cls.sheet} role="dialog" aria-modal="true">
                <div className={cls.sheetInner}>
                    <div className={cls.col}>
                        <div className={cls.hint}>Меню</div>
                        <nav className={cls.nav}>
                            <Link href="/#catalog" onClick={onClose}>Каталог авто</Link>
                            <Link href="/#about" onClick={onClose}>О компании</Link>
                            <Link href="/#advantages" onClick={onClose}>Преимущества</Link>
                            <Link href="/#steps" onClick={onClose}>Этапы работы</Link>
                            <Link href="/#reviews" onClick={onClose}>Отзывы</Link>
                            <Link href="/#contacts" onClick={onClose}>Контакты</Link>
                        </nav>
                    </div>

                    <div className={cls.col}>
                        <div className={cls.hint}>Контакты</div>
                        <div className={cls.contacts}>
                            <a href="{`tel:${sitePhone.replace(/\s+/g, '')}`}" className={cls.phone}>{sitePhone}</a>
                            <div className={cls.addr}>{siteAddress}</div>
                        </div>
                    </div>

                    <div className={cls.colRight}>
                        <div className={cls.hint}>Мессенджеры</div>
                        <div className={cls.socials}>
                            <a className={cls.social} href={whatsapp} aria-label="WhatsApp">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.06948 20.3704L0.823459 21.3758C0.8173 21.3773 0.810864 21.3771 0.804774 21.3754C0.798684 21.3737 0.793078 21.3704 0.78851 21.3659C0.783943 21.3615 0.780552 21.3559 0.778615 21.3497C0.776677 21.3435 0.776262 21.337 0.777439 21.3306L1.66806 17.0052C1.67457 16.9733 1.67073 16.9426 1.65657 16.9131C1.53616 16.6668 1.41398 16.4247 1.29003 16.1867C-0.968445 11.8524 -0.220348 6.68543 3.22889 3.20946C6.60201 -0.191179 11.9175 -0.975143 16.1494 1.26952C19.943 3.28209 22.267 7.3799 21.9766 11.7204C21.4781 19.1825 13.8802 23.9765 6.90564 21.2057C6.38862 21.0002 5.73969 20.6618 5.15979 20.3801C5.13087 20.366 5.10076 20.3627 5.06948 20.3704ZM14.4318 13.306C13.7103 13.6222 13.504 14.5878 12.5691 14.5072C12.4038 14.4924 12.1468 14.3734 11.798 14.1502C10.287 13.1805 8.96551 12 7.8335 10.6087C7.53426 10.2408 7.45457 9.86224 7.59443 9.47306C7.88924 8.65548 8.87021 8.36228 8.41869 7.34535C8.08935 6.60303 7.75941 5.86072 7.4289 5.1184C7.17924 4.55858 6.90211 4.16171 6.26291 4.23878C6.07049 4.26239 5.87042 4.35691 5.66267 4.52226C4.95792 5.08299 4.14609 6.03877 3.98142 6.95115C3.50336 9.59974 5.45374 12.1686 7.2235 13.9332C9.38104 16.0857 12.4566 18.2852 15.6872 17.7448C16.7983 17.5588 17.6951 16.6872 18.2883 15.7331C18.5911 15.2469 18.6752 14.7153 18.2423 14.3097C18.0988 14.175 17.8108 14.0463 17.3782 13.9234C16.5879 13.7002 15.7976 13.477 15.0073 13.2537C14.8219 13.2012 14.6301 13.2186 14.4318 13.306Z" fill="#FFFEFF" />
                                </svg>
                            </a>
                            <a className={cls.social} href={telegram} aria-label="Telegram">
                                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.987 14.3404L10.5238 20.2036C11.1865 20.2036 11.4735 19.9474 11.8177 19.6397L14.9246 16.9675L21.3624 21.2105C22.5431 21.8027 23.3749 21.4909 23.6934 20.233L27.9192 2.41247L27.9204 2.41142C28.2949 0.840624 27.2892 0.226377 26.1388 0.611725L1.29991 9.17023C-0.395302 9.76243 -0.369635 10.6129 1.01173 10.9983L7.36205 12.7759L22.1126 4.46941C22.8068 4.05571 23.4379 4.28461 22.9188 4.6983L10.987 14.3404Z" fill="#FFFEFF" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <button className={cls.modalButton} onClick={() => setOpenModal(true)}>Оставить заявку</button>
                </div>
            </div>
            <ModalLead open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    );
}
