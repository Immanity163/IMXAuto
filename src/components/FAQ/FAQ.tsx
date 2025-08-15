'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
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

export default function FAQ({ className, title }: Props) {
  const [items, setItems] = useState<FaqItem[]>([]);

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

      const res = await fetch("https://imxauto.ru/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 }, // ISR если нужен
      });

      const json = await res.json();

const wpFaq: FaqItem[] = (json.data?.fAQs?.nodes || []).map((f: any) => ({
  id: f.id,
  question: f.faqs?.question || '',
  answer: f.faqs?.answer || '',
}));

      setItems(wpFaq);
    }

    loadFaq();
  }, []);

  const initialIndex =
    items.findIndex((i) => i.defaultOpen) !== -1
      ? items.findIndex((i) => i.defaultOpen)
      : 0;

  const [openIndex, setOpenIndex] = useState<number>(initialIndex);

  return (
    <section className={`${cls.faq} ${className ?? ''}`}>
      {title && <h2 className={cls.title}>{title}</h2>}

      <div className={cls.list}>
        {items.map((item, idx) => (
          <FaqRow
            key={item.id ?? `${idx}`}
            item={item}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </div>
    </section>
  );
}

type RowProps = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

const FaqRow: React.FC<RowProps> = ({ item, open, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const buttonId = useId();
  const height = open && contentRef.current ? contentRef.current.scrollHeight : 0;

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
        style={{ height }}
      >
        <div ref={contentRef} className={cls.inner}>
          {item.answer}
        </div>
      </div>
    </div>
  );
};
