'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styles from './AskForm.module.scss';

type SubmitData = { name: string; phone: string; question: string; agree: boolean };

type Props = {
  imageSrc?: string;
  imageAlt?: string;
  policyHref?: string;
  onSubmit?: (data: SubmitData) => void | Promise<void>;
  className?: string;
};

export default function AskBlockRadix({
  imageSrc = '/images/ask-car.jpg',
  imageAlt = 'Автомобиль',
  policyHref = '/privacy',
  onSubmit,
  className,
}: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  const clearForm = () => {
    setName('');
    setPhone('');
    setQuestion('');
    setAgree(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setAgreeError(true);
      checkboxRef.current?.focus();
      return;
    }
    setAgreeError(false);
    try {
      setSubmitting(true);
      await Promise.resolve(onSubmit?.({ name, phone, question, agree }));
      clearForm();
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendMore = () => {
    setSent(false);
  };

  return (
    <section className={className}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h2 className="section-title">Задать вопрос</h2>

            {sent ? (
              <div className={styles.successWrap}>
                <div className={styles.successIcon}>
                  <CheckIcon style={{ width: 28, height: 28, color: '#fff' }} />
                </div>
                <div className={styles.successText}>
                  <div className={styles.successTitle}>Спасибо! Заявка отправлена</div>
                  <div className={styles.successText}>
                    Мы свяжемся с вами в ближайшее время и ответим на ваш вопрос.
                  </div>
                  <button onClick={handleSendMore} className={styles.successBtn}>
                    Отправить ещё один вопрос
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row2}>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    className={styles.input}
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Вопрос"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={5}
                  required
                />

                <div className={styles.footer}>
                  <label className={styles.checkWrap}>
                    <Checkbox.Root
                      ref={checkboxRef}
                      checked={agree}
                      onCheckedChange={(v) => {
                        const val = Boolean(v);
                        setAgree(val);
                        if (val) setAgreeError(false);
                      }}
                      id="agree"
                      className={[
                        styles.checkbox,
                        agree ? styles.checkboxChecked : '',
                        agreeError ? styles.checkboxError : '',
                      ].filter(Boolean).join(' ')}
                      aria-invalid={agreeError || undefined}
                    >
                      <Checkbox.Indicator>
                        <CheckIcon style={{ width: 16, height: 16, color: '#fff' }} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>

                    <span className={styles.checkText}>
                      Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                      <a href={policyHref} className={styles.policyLink}>
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>

                  <button type="submit" className={styles.btn} disabled={submitting}>
                    {submitting ? 'Отправляем…' : 'Отправить'}
                  </button>

                  {agreeError && (
                    <div role="alert" className={styles.errorNote}>
                      Пожалуйста, поставьте галочку, чтобы продолжить.
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          <div className={styles.imageBox}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
