'use client';

import React from 'react';
import cls from './Perks.module.scss';

const Perks = () => {
  return (
    <section className={cls.perks}>
      <div className="container">
        <h2 className={cls.title}>Наши преимущества</h2>

        <div className={cls.row}>
          <div className={`${cls.card} ${cls.light}`}>
            <p className={cls.desc}>
              Более 5 лет опыта работы на международных автоаукционах
            </p>
            <div className={cls.stat}>5+</div>
          </div>

          <div className={`${cls.card} ${cls.teal}`}>
            <p className={`${cls.desc} ${cls.descLight}`}>
              21 день — средний срок доставки автомобиля &laquo;под ключ&raquo;
            </p>
            <div className={cls.stat}>21</div>
          </div>

          <div className={`${cls.card} ${cls.dark}`}>
            <p className={`${cls.desc} ${cls.descLight}`}>
              Экономия от 30% по сравнению с ценами на авторынке РФ
            </p>
            <div className={cls.stat}>30%</div>
          </div>

          <div className={`${cls.card} ${cls.black}`}>
            <p className={`${cls.desc} ${cls.descLight}`}>
              40+ проверенных поставщиков в Китае, Корее и Японии
            </p>
            <div className={cls.stat}>40+</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perks;
