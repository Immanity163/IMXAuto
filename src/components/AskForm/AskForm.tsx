'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

type SubmitData = { name: string; phone: string; question: string; agree: boolean };

type Props = {
  imageSrc?: string;
  imageAlt?: string;
  policyHref?: string;
  /** если вернёшь Promise — кнопка покажет загрузку и дождётся */
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
        <div style={styles.card}>
          {/* Левая часть */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
            <h2 style={styles.title}>Задать вопрос</h2>

            {/* Состояние: Успех */}
            {sent ? (
              <div style={styles.successWrap}>
                <div style={styles.successIcon}>
                  <CheckIcon style={{ width: 28, height: 28, color: '#fff' }} />
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={styles.successTitle}>Спасибо! Заявка отправлена</div>
                  <div style={styles.successText}>
                    Мы свяжемся с вами в ближайшее время и ответим на ваш вопрос.
                  </div>
                  <button onClick={handleSendMore} style={styles.successBtn}>
                    Отправить ещё один вопрос
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                <div style={styles.row2}>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    style={styles.input}
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <textarea
                  style={{ ...styles.input, ...styles.textarea }}
                  placeholder="Вопрос"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={5}
                  required
                />

                <div style={styles.footer}>
                  <label style={styles.checkWrap}>
                    <Checkbox.Root
                      ref={checkboxRef}
                      checked={agree}
                      onCheckedChange={(v) => {
                        const val = Boolean(v);
                        setAgree(val);
                        if (val) setAgreeError(false);
                      }}
                      id="agree"
                      style={{
                        ...styles.checkbox,
                        ...(agree ? styles.checkboxChecked : null),
                        ...(agreeError ? styles.checkboxError : null),
                      }}
                      aria-invalid={agreeError || undefined}
                    >
                      <Checkbox.Indicator>
                        <CheckIcon style={{ width: 16, height: 16, color: '#fff' }} />
                      </Checkbox.Indicator>
                    </Checkbox.Root>

                    <span style={styles.checkText}>
                      Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                      <a href={policyHref} style={styles.policyLink}>
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>

                  <button type="submit" style={styles.btn} disabled={submitting}>
                    {submitting ? 'Отправляем…' : 'Отправить'}
                  </button>

                  {agreeError && (
                    <div role="alert" style={styles.errorNote}>
                      Пожалуйста, поставьте галочку, чтобы продолжить.
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Правая часть */}
          <div>
            <div style={styles.imageBox}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TEAL = '#04C7C7';
const DARK = '#0F172A';

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#E9EEF3',
    borderRadius: 28,
    padding: 36,
    display: 'grid',
    gridTemplateColumns: '1fr 520px',
    gap: 28,
    overflow: 'hidden',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(28px, 4.2vw, 64px)',
    lineHeight: 1.05,
    fontWeight: 800,
    color: DARK,
  },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  input: {
    width: '100%',
    border: 0,
    outline: 'none',
    borderRadius: 16,
    background: '#fff',
    padding: '18px 22px',
    fontSize: 18,
    lineHeight: 1.2,
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
  },
  textarea: { minHeight: 136, resize: 'vertical' },
  footer: { display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16 },
  checkWrap: { display: 'grid', gridTemplateColumns: '24px 1fr', alignItems: 'start', gap: 12 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    background: '#fff',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
    display: 'grid',
    placeItems: 'center',
    outline: 'none',
    transition: 'background .15s ease, box-shadow .15s ease',
  },
  checkboxChecked: {
    background: TEAL,
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.0)',
  },
  checkboxError: {
    boxShadow: 'inset 0 0 0 1px rgba(220,38,38,.9), 0 0 0 6px rgba(220,38,38,.08)',
  },
  checkText: { fontSize: 16, lineHeight: 1.45, color: DARK },
  policyLink: { color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 },
  btn: {
    border: 0,
    borderRadius: 16,
    padding: '16px 28px',
    fontSize: 20,
    fontWeight: 600,
    background: TEAL,
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform .15s ease, box-shadow .15s ease, opacity .15s ease',
  },
  errorNote: { gridColumn: '1 / -1', marginTop: 4, fontSize: 14, color: '#B91C1C' },
  imageBox: { position: 'relative', borderRadius: 24, overflow: 'hidden', width: '100%', minHeight: 390 },

  /* Success styles */
  successWrap: {
    display: 'grid',
    gridTemplateColumns: '56px 1fr',
    gap: 16,
    alignItems: 'center',
    background: 'rgba(4,199,199,0.12)',
    borderRadius: 18,
    padding: '18px 20px',
    border: `1px solid rgba(4,199,199,0.35)`,
    animation: 'fadeIn .25s ease',
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: TEAL,
    display: 'grid',
    placeItems: 'center',
    boxShadow: '0 10px 20px rgba(4,199,199,.25)',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: DARK,
  },
  successText: {
    fontSize: 16,
    color: DARK,
    opacity: 0.9,
  },
  successBtn: {
    marginTop: 8,
    width: 'fit-content',
    border: 0,
    borderRadius: 14,
    padding: '10px 16px',
    fontSize: 16,
    fontWeight: 600,
    background: '#fff',
    color: DARK,
    boxShadow: 'inset 0 0 0 1px rgba(15,23,42,.12)',
    cursor: 'pointer',
  },
};
