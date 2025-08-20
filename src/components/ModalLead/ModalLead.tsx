'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cls from './ModalLead.module.scss';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ModalLead: React.FC<Props> = ({ open, onClose }) => {
  const [mounted, setMounted] = useState(false);

  // form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(true);
  const [agreeError, setAgreeError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const checkboxRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // site settings from GraphQL
  const [sitePhone, setSitePhone] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [telegram, setTelegram] = useState('');

  useEffect(() => setMounted(true), []);

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

  // Esc + блокировка скролла
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
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
      // TODO: заменить на реальный API-запрос
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
      setName('');
      setPhone('');
      setAgree(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div className={cls.overlay} onMouseDown={handleOverlayClick} aria-modal="true" role="dialog">
      <div className={cls.modal} ref={dialogRef}>
        <button className={cls.close} onClick={onClose} aria-label="Закрыть">×</button>

        {!sent ? (
          <div className={cls.content}>
            <h2 className={cls.title}>Оставьте заявку на бесплатную консультацию</h2>
            <p className={cls.subtitle}>Мы свяжемся с вами в ближайшее время</p>

            <form className={cls.form} onSubmit={handleSubmit}>
              <div className={cls.inputsRow}>
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
                  className={`${cls.checkbox} ${agree ? cls.checkboxChecked : ''} ${
                    agreeError ? cls.checkboxError : ''
                  }`}
                  aria-invalid={agreeError || undefined}
                >
                  <Checkbox.Indicator>
                    <CheckIcon width={18} height={18} color="#0f172a" />
                  </Checkbox.Indicator>
                </Checkbox.Root>

                <span className={cls.checkText}>
                  Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                  <a href="/privacy" className={cls.link}>политикой конфиденциальности</a>
                </span>
              </label>

              {agreeError && <div role="alert" className={cls.errorNote}>Поставьте галочку, чтобы продолжить.</div>}

              <button type="submit" className={cls.submit} disabled={submitting}>
                {submitting ? 'Отправляем…' : 'Отправить'}
              </button>
            </form>

          </div>
        ) : (
          <div className={`${cls.content} ${cls.successState}`}>
            <div className={cls.successIcon}>
              <CheckIcon width={34} height={34} color="#fff" />
            </div>
            <h3 className={cls.successTitle}>Спасибо! Заявка отправлена</h3>
            <p className={cls.successText}>Мы свяжемся с вами в ближайшее время.</p>
            <button className={cls.successBtn} onClick={() => setSent(false)}>Отправить ещё одну заявку</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalLead;
