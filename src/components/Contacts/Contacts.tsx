'use client';

import React, { useEffect, useState } from 'react';
import cls from './Contacts.module.scss';

type Props = {
  className?: string;
  company?: {
    name: string;
  };
  mapSlot?: React.ReactNode;
};

const Contacts: React.FC<Props> = ({
  className,
  company = {
    name: 'ООО «IMX AUTO»',
  },
  mapSlot,
}) => {
  const [phoneLabel, setPhoneLabel] = useState('+7 (900) 000-00-00');
  const [phoneHref, setPhoneHref] = useState('tel:+79000000000');
  const [address, setAddress] = useState('г. Москва, ул. Мира, д. 000');
  const [whatsappHref, setWhatsappHref] = useState('#');
  const [telegramHref, setTelegramHref] = useState('#');
  const [inn, setInn] = useState('1111111111');
  const [kpp, setKpp] = useState('111111111');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://91.197.99.124/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query GetOptions {
                siteSettings {
                  nodes {
                    options {
                      optionsPhone
                      optionsaddress
                      whatsapp
                      telegram
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
        const opts = json.data?.siteSettings?.nodes?.[0]?.options;
        if (opts) {
          setPhoneLabel(opts.optionsPhone ?? phoneLabel);
          setPhoneHref(`tel:${opts.optionsPhone ?? ''}`);
          setAddress(opts.optionsaddress ?? address);
          setWhatsappHref(opts.whatsapp ?? '#');
          setTelegramHref(opts.telegram ?? '#');
          setInn(opts.optionsinn ?? inn);
          setKpp(opts.optionskpp ?? kpp);
        }
      } catch (e) {
        console.error('Failed to fetch contacts:', e);
      }
    }
    fetchData();
  }, []);

  return (
    <section className={className}>
      <div className="container">
        <h2 className="section-title">Наши контакты</h2>

        <div className={cls.flex}>
          <div className={cls.left}>
            <div className={cls.card}>
              <div className={cls.cardHead}>
                <div className={cls.cardTitle}>Основная информация</div>
                <div className={cls.badge}>
                  <InfoIcon />
                </div>
              </div>
              <div className={cls.cardBody}>
                <p className={cls.rowText}>{company.name}</p>
                <p className={cls.rowText}>ИНН {inn}</p>
                <p className={cls.rowText}>КПП {kpp}</p>
              </div>
            </div>

            <div className={cls.card}>
              <div className={cls.cardHead}>
                <div className={cls.cardTitle}>Контактная информация</div>
                <div className={cls.badge}>
                  <QuestionIcon />
                </div>
              </div>
              <div className={cls.cardBody}>
                <div className={cls.iconRow}>
                  <PhoneIcon />
                  <a href={phoneHref} className={cls.linkText}>
                    {phoneLabel}
                  </a>
                </div>

                <div className={cls.iconRow}>
                  <PinIcon />
                  <span className={cls.rowText}>{address}</span>
                </div>

                <div className={cls.messengers}>
                  {whatsappHref && (
                    <a className={cls.messengerBtn} href={whatsappHref} aria-label="WhatsApp">
                      <WhatsappIcon />
                    </a>
                  )}
                  {telegramHref && (
                    <a className={cls.messengerBtn} href={telegramHref} aria-label="Telegram">
                      <TelegramIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={cls.mapWrap}>{mapSlot ?? <div className={cls.mapPlaceholder}></div>}</div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;


const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#00CED8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#00CED8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1_243)">
      <path d="M10.5372 4.5C11.2698 4.64292 11.943 5.00119 12.4708 5.52895C12.9986 6.05671 13.3568 6.72995 13.4997 7.4625M10.5372 1.5C12.0592 1.66908 13.4784 2.35063 14.5619 3.43276C15.6454 4.51488 16.3288 5.93326 16.4997 7.455M7.66998 10.3973C6.7688 9.49612 6.05721 8.47714 5.53521 7.38992C5.49031 7.2964 5.46786 7.24965 5.45061 7.19048C5.38932 6.98021 5.43334 6.72202 5.56085 6.54395C5.59673 6.49384 5.6396 6.45097 5.72533 6.36524C5.98754 6.10303 6.11864 5.97193 6.20435 5.84009C6.5276 5.34293 6.5276 4.70199 6.20436 4.20482C6.11864 4.07299 5.98754 3.94189 5.72533 3.67968L5.57918 3.53353C5.1806 3.13495 4.98131 2.93566 4.76727 2.8274C4.3416 2.6121 3.8389 2.6121 3.41323 2.8274C3.1992 2.93566 2.99991 3.13495 2.60132 3.53353L2.4831 3.65176C2.08588 4.04897 1.88727 4.24758 1.73559 4.51761C1.56727 4.81724 1.44625 5.28261 1.44727 5.62627C1.44819 5.93598 1.50827 6.14765 1.62843 6.57098C2.27415 8.84603 3.49251 10.9928 5.2835 12.7838C7.07448 14.5748 9.22125 15.7931 11.4963 16.4389C11.9196 16.559 12.1313 16.6191 12.441 16.62C12.7847 16.621 13.25 16.5 13.5497 16.3317C13.8197 16.18 14.0183 15.9814 14.4155 15.5842L14.5338 15.466C14.9323 15.0674 15.1316 14.8681 15.2399 14.654C15.4552 14.2284 15.4552 13.7257 15.2399 13.3C15.1316 13.086 14.9323 12.8867 14.5338 12.4881L14.3876 12.3419C14.1254 12.0797 13.9943 11.9486 13.8625 11.8629C13.3653 11.5397 12.7244 11.5397 12.2272 11.8629C12.0954 11.9486 11.9643 12.0797 11.702 12.3419C11.6163 12.4277 11.5734 12.4705 11.5233 12.5064C11.3453 12.6339 11.0871 12.678 10.8768 12.6167C10.8176 12.5994 10.7709 12.577 10.6774 12.5321C9.59015 12.0101 8.57116 11.2985 7.66998 10.3973Z" stroke="#12161A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_1_243">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#12161A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 16.5C12 13.5 15 10.8137 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 10.8137 6 13.5 9 16.5Z" stroke="#12161A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.06948 20.3704L0.823459 21.3758C0.8173 21.3773 0.810864 21.3771 0.804774 21.3754C0.798684 21.3737 0.793078 21.3704 0.78851 21.3659C0.783943 21.3615 0.780552 21.3559 0.778615 21.3497C0.776677 21.3435 0.776262 21.337 0.777439 21.3306L1.66806 17.0052C1.67457 16.9733 1.67073 16.9426 1.65657 16.9131C1.53616 16.6668 1.41398 16.4247 1.29003 16.1867C-0.968445 11.8524 -0.220348 6.68543 3.22889 3.20946C6.60201 -0.191179 11.9175 -0.975143 16.1494 1.26952C19.943 3.28209 22.267 7.3799 21.9766 11.7204C21.4781 19.1825 13.8802 23.9765 6.90564 21.2057C6.38862 21.0002 5.73969 20.6618 5.15979 20.3801C5.13087 20.366 5.10076 20.3627 5.06948 20.3704ZM14.4318 13.306C13.7103 13.6222 13.504 14.5878 12.5691 14.5072C12.4038 14.4924 12.1468 14.3734 11.798 14.1502C10.287 13.1805 8.96551 12 7.8335 10.6087C7.53426 10.2408 7.45457 9.86224 7.59443 9.47306C7.88924 8.65548 8.87021 8.36228 8.41869 7.34535C8.08935 6.60303 7.75941 5.86072 7.4289 5.1184C7.17924 4.55858 6.90211 4.16171 6.26291 4.23878C6.07049 4.26239 5.87042 4.35691 5.66267 4.52226C4.95792 5.08299 4.14609 6.03877 3.98142 6.95115C3.50336 9.59974 5.45374 12.1686 7.2235 13.9332C9.38104 16.0857 12.4566 18.2852 15.6872 17.7448C16.7983 17.5588 17.6951 16.6872 18.2883 15.7331C18.5911 15.2469 18.6752 14.7153 18.2423 14.3097C18.0988 14.175 17.8108 14.0463 17.3782 13.9234C16.5879 13.7002 15.7976 13.477 15.0073 13.2537C14.8219 13.2012 14.6301 13.2186 14.4318 13.306Z" fill="#FFFEFF" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.987 14.3404L10.5238 20.2036C11.1865 20.2036 11.4735 19.9474 11.8177 19.6397L14.9246 16.9675L21.3624 21.2105C22.5431 21.8027 23.3749 21.4909 23.6934 20.233L27.9192 2.41247L27.9204 2.41142C28.2949 0.840624 27.2892 0.226377 26.1388 0.611725L1.29991 9.17023C-0.395302 9.76243 -0.369635 10.6129 1.01173 10.9983L7.36205 12.7759L22.1126 4.46941C22.8068 4.05571 23.4379 4.28461 22.9188 4.6983L10.987 14.3404Z" fill="#FFFEFF" />
  </svg>
);
