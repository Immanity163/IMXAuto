'use client';

import React from 'react';
import cls from './BurgerMenu.module.scss';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  ariaLabel?: string;
};

export default function BurgerButton({ isOpen, onToggle, ariaLabel = 'Открыть меню' }: Props) {
  return (
    <button
      type="button"
      className={`${cls.burgerBtn} ${isOpen ? cls.burgerOpen : ''}`}
      onClick={onToggle}
      aria-label={isOpen ? 'Закрыть меню' : ariaLabel}
      aria-expanded={isOpen}
      aria-controls="burger-menu-modal"
    >
      <span className={cls.line} />
      <span className={cls.line} />
      <span className={cls.line} />
    </button>
  );
}
