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
    fetch('https://imxauto.ru/graphql', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        `
      })
    })
      .then(res => res.json())
      .then(json => {
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
      })
  }, []);

  const contacts = { phoneLabel, phoneHref, address, whatsappHref, telegramHref };

  return (
    <section className={className}>
      <div className="container">
        <h2 className={cls.pageTitle}>Наши контакты</h2>

        <div className={cls.flex}>
          <div className={cls.left}>
            <div className={cls.card}>
              <div className={cls.cardHead}>
                <div className={cls.cardTitle}>Основная информация</div>
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
              </div>
              <div className={cls.cardBody}>
                <div className={cls.iconRow}>
                  <span>📞</span>
                  <a href={contacts.phoneHref} className={cls.linkText}>
                    {contacts.phoneLabel}
                  </a>
                </div>
                <div className={cls.iconRow}>
                  <span>📍</span>
                  <span className={cls.rowText}>{contacts.address}</span>
                </div>
                <div className={cls.messengers}>
                  {contacts.whatsappHref && (
                    <a href={contacts.whatsappHref} aria-label="WhatsApp">
                      WhatsApp
                    </a>
                  )}
                  {contacts.telegramHref && (
                    <a href={contacts.telegramHref} aria-label="Telegram">
                      Telegram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={cls.mapWrap}>
            {mapSlot ?? <div className={cls.mapPlaceholder}></div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
