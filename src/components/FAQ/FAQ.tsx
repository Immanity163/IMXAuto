'use client';

import React, { useId, useLayoutEffect, useRef, useState, useEffect } from 'react';
import cls from './FAQ.module.scss';

export type FaqItem = {
  id?: string;
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
};

type Props = {
  className?: string;
  title?: string;
};

const FAQ: React.FC<Props> = ({ className, title }) => {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
    async function loadFaq() {
      const query = `
        query Getfaq {
          fAQs {
            nodes {
              id
              faqs {
                question
                answer
              }
            }
          }
        }
      `;

      const res = await fetch("http://91.197.99.124/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 },
      });

      const json = await res.json();

      const wpFaq: FaqItem[] = (json.data?.fAQs?.nodes || []).map((f: any) => ({
        id: f.id,
        question: f.faqs?.question || '',
        answer: f.faqs?.answer || '',
      }));

      setItems(wpFaq);

      // Если есть дефолтно открытый элемент
      const defaultIndex = wpFaq.findIndex(i => i.defaultOpen);
      setOpenIndex(defaultIndex >= 0 ? defaultIndex : -1);
    }

    loadFaq();
  }, []);

  return (
    <section className={`${cls.faq} ${className ?? ''}`}>
      {title && <h2 className={cls.title}>{title}</h2>}
      <div className={cls.list}>
        {items.map((item, idx) => (
          <FaqRow
            key={item.id ?? idx}
            item={item}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;

type RowProps = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

const FaqRow: React.FC<RowProps> = ({ item, open, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const buttonId = useId();
  const [panelHeight, setPanelHeight] = useState(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const apply = () => {
      if (open) setPanelHeight(el.scrollHeight);
      else setPanelHeight(0);
    };

    apply();

    const ro = new ResizeObserver(() => {
      if (open) setPanelHeight(el.scrollHeight);
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, [open]);

  return (
    <div className={`container ${cls.row} ${open ? cls.open : cls.closed}`}>
      <div className={cls.heading}>
        <button
          id={buttonId}
          className={cls.q}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          type="button"
        >
          <span className={cls.qText}>{item.question}</span>
        </button>

        <button
          className={cls.toggle}
          aria-label={open ? 'Свернуть' : 'Развернуть'}
          aria-controls={panelId}
          aria-expanded={open}
          onClick={onToggle}
          type="button"
        >
          <svg className={cls.icon} width="24" height="24" viewBox="0 0 24 24">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M12 5v14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={cls.iconPlus}
            />
          </svg>
        </button>
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cls.panel}
        ref={panelRef}
        style={{ height: open ? panelHeight : 0 }}
      >
        <div ref={contentRef} className={cls.inner}>
          {item.answer}
        </div>
      </div>
    </div>
  );
};
