'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import cls from './PromoWithForm.module.scss';

const PromoWithForm: React.FC = () => {
  // форма
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setAgreeError(true);
      checkboxRef.current?.focus();
      return;
    }
    setAgreeError(false);

    setSubmitting(true);
    try {
      // здесь можешь сделать реальный запрос
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
      setName('');
      setPhone('');
      setAgree(false);
    } finally {
      setSubmitting(false);
    }
  };
    const [whatsappHref, setWhatsappHref] = useState('#');
    const [telegramHref, setTelegramHref] = useState('#');
    useEffect(() => {
        fetch('http://91.197.99.124/graphql', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query GetOptions {
                siteSettings {
                  nodes {
                    options {
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
            if (opts) {
              setWhatsappHref(opts.whatsapp ?? '#');
              setTelegramHref(opts.telegram ?? '#');

            }
          })
      }, []);
    

  return (
    <section className={cls.section}>
      <div className="container">
        <div className={cls.wrap}>
          <div className={cls.infoCard}>
            <h2 className={cls.infoTitle}>Автомобили, которые мы возим</h2>
            <p className={cls.infoText}>
              Мы специализируемся на поставке надёжных и проверенных автомобилей из Китая, Кореи и
              с японских аукционов, а также у проверенных дилеров. Мы полностью берём на себя весь процесс:
              от выбора и приобретения автомобиля до доставки в Ваш город. Отсутствие посредников
              позволяет предлагать конкурентные цены, а собственные представители в каждой стране
              обеспечивают прозрачность и высокое качество на каждом этапе сделки.
            </p>
            <p className={`${cls.infoText} ${cls.shortText}`}>
              Подбираем авто под любые задачи: от городских компактных моделей и семейных минивэнов
              до премиальных седанов, кроссоверов, внедорожников и коммерческого транспорта.
            </p>

            <div className={cls.messengersLine}>
              <div className={cls.mesTitle}>Наши WhatsApp<br /> и Telegram</div>
              <div className={cls.mesBtns}>
                <a className={cls.mesBtn} href="#" aria-label="WhatsApp">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.22251 23.7091L1.36991 24.8581C1.36287 24.8598 1.35552 24.8596 1.34856 24.8576C1.3416 24.8557 1.33519 24.852 1.32997 24.8468C1.32475 24.8417 1.32088 24.8353 1.31866 24.8283C1.31645 24.8212 1.31597 24.8137 1.31732 24.8065L2.33517 19.8631C2.34261 19.8267 2.33822 19.7916 2.32204 19.7578C2.18443 19.4764 2.04479 19.1996 1.90314 18.9276C-0.677979 13.9742 0.176989 8.06908 4.11898 4.09654C7.97397 0.210098 14.0488 -0.685861 18.8852 1.87947C23.2208 4.17955 25.8768 8.86276 25.5449 13.8233C24.9753 22.3515 16.292 27.8303 8.32098 24.6637C7.73009 24.4288 6.98846 24.0421 6.32572 23.7202C6.29266 23.704 6.25826 23.7003 6.22251 23.7091ZM16.9223 15.6355C16.0977 15.9969 15.862 17.1004 14.7935 17.0082C14.6046 16.9914 14.3109 16.8554 13.9122 16.6002C12.1854 15.492 10.6751 14.1429 9.38138 12.5528C9.0394 12.1323 8.94832 11.6997 9.10817 11.2549C9.44509 10.3206 10.5662 9.98547 10.0502 8.82327C9.67378 7.97491 9.29672 7.12655 8.91898 6.27819C8.63366 5.63839 8.31694 5.18483 7.58642 5.27291C7.36651 5.2999 7.13786 5.40791 6.90043 5.59689C6.09502 6.23772 5.1672 7.33005 4.97901 8.37276C4.43265 11.3997 6.66166 14.3356 8.68424 16.3522C11.15 18.8123 14.665 21.3259 18.357 20.7084C19.6269 20.4958 20.6518 19.4996 21.3297 18.4093C21.6758 17.8536 21.7719 17.2461 21.2771 16.7825C21.1132 16.6286 20.784 16.4814 20.2896 16.3411C19.3864 16.086 18.4832 15.8308 17.58 15.5757C17.3682 15.5157 17.149 15.5356 16.9223 15.6355Z" fill="#FFFEFF" />
                  </svg>
                </a>
                <a className={cls.mesBtn} href="#" aria-label="Telegram">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5565 15.8176L12.0272 22.5184C12.7845 22.5184 13.1126 22.2256 13.5059 21.874L17.0566 18.82L24.4142 23.6692C25.7635 24.346 26.7142 23.9896 27.0782 22.552L31.9077 2.18568L31.909 2.18448C32.337 0.389285 31.1877 -0.312712 29.873 0.127686L1.48561 9.90884C-0.451774 10.5856 -0.42244 11.5576 1.15626 11.998L8.41377 14.0296L25.2715 4.53646C26.0649 4.06367 26.7862 4.32526 26.1929 4.79806L12.5565 15.8176Z" fill="#FFFEFF" />
                  </svg>
                </a>
              </div>
            </div>

            <div className={cls.carBox}>
              <Image
                src="/img/promo-car.png"
                alt="Автомобиль"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className={cls.formCard}>
            {sent ? (
              <div className={cls.successWrap}>
                <div className={cls.successIcon}>
                  <CheckIcon width={28} height={28} color="#fff" />
                </div>
                <div className={cls.successText}>
                  <div className={cls.successTitle}>Спасибо! Заявка отправлена</div>
                  <p>Мы свяжемся с вами в ближайшее время.</p>
                  <button className={cls.successBtn} onClick={() => setSent(false)}>
                    Отправить ещё одну заявку
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={cls.formTitle}>Оставьте заявку на бесплатную консультацию</h3>
                <p className={cls.formSub}>Мы свяжемся с вами в ближайшее время</p>

                <form className={cls.form} onSubmit={handleSubmit}>
                  <div className={cls.inputWrap}>
                    <input
                      className={cls.input}
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      className={cls.input}
                      type="tel"
                      placeholder="Телефон"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <label className={cls.checkWrap}>
                    <Checkbox.Root
                      ref={checkboxRef}
                      checked={agree}
                      onCheckedChange={(v) => {
                        const val = Boolean(v);
                        setAgree(val);
                        if (val) setAgreeError(false);
                      }}
                      className={`${cls.checkbox} ${agree ? cls.checkboxChecked : ''} ${agreeError ? cls.checkboxError : ''
                        }`}
                      aria-invalid={agreeError || undefined}
                    >
                      <Checkbox.Indicator>
                        <CheckIcon width={16} height={16} color="#fff" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className={cls.checkText}>
                      Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                      <a href="/privacy" className={cls.policyLink}>
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>

                  {agreeError && (
                    <div role="alert" className={cls.errorNote}>
                      Поставьте галочку, чтобы продолжить.
                    </div>
                  )}

                  <button className={cls.btn} type="submit" disabled={submitting}>
                    {submitting ? 'Отправляем…' : 'Отправить'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoWithForm;
