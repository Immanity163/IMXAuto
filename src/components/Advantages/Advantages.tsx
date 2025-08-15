import React from "react";
import cls from "./Advantages.module.scss";
import Image from "next/image";

export default function Advantages() {
  return (
    <section className={cls.advantages}>
      <div className="container">
        <h2 className="section-title">С нами выгоднее</h2>
        <div className={cls.row}>
          <div className={`${cls.card} ${cls.cardPrimary}`}>
            <div className={cls.iconCircle}>
              <Image src={'/img/adv-1.png'} width={41} height={41} alt={""} />
            </div>
            <div className={cls.text}>
              <div className={cls.cardTitle}>Низкие цены</div>
              <div className={cls.cardSub}>
                Мы привозим автомобили дешевле на 30–40% по сравнению с рынком
              </div>
            </div>
          </div>

          <div className={cls.card}>
            <div className={cls.iconCircle}>
              <Image src={'/img/adv-2.png'} width={41} height={41} alt={""} />
            </div>
            <div className={cls.text}>
              <div className={cls.cardTitle}>Под ключ</div>
              <div className={cls.cardSub}>
                Берём на себя весь процесс от подбора и покупки авто до доставки
              </div>
            </div>
          </div>

          <div className={cls.card}>
            <div className={cls.iconCircle}>
              <Image src={'/img/adv-3.png'} width={41} height={41} alt={""} />
            </div>
            <div className={cls.text}>
              <div className={cls.cardTitle}>Прозрачность</div>
              <div className={cls.cardSub}>
                Вы всегда знаете, за что платите: доступ к договору и расчётам
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
