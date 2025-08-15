'use client';

import Image from 'next/image';
import React from 'react';
import cls from './Steps.module.scss';

const Steps = () => {
    return (
        <section className={cls.stepsSection}>
            <div className="container">
                <h2 className={cls.title}>Этапы работы с нами</h2>

                <div className={cls.row}>
                    {/* 01 */}
                    <div className={cls.card}>
                        <div className={cls.mediaTop}>
                            <Image
                                src="/img/steps-1.png"
                                alt=""
                                fill
                                sizes="(min-width:1200px) 33vw, 100vw"
                                style={{ objectFit: 'cover' }}
                            />
                            <span className={cls.stepNum}>/01</span>
                        </div>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>Заключаем с вами договор</div>
                            <p className={cls.cardText}>
                                На первом этапе мы оформляем договор, где прописаны все условия покупки.
                                Это ваша гарантия безопасности и прозрачности на каждом этапе.
                            </p>
                        </div>
                    </div>

                    {/* 02 */}
                    <div className={`${cls.card} ${cls.cardSoft}`}>
                        <span className={`${cls.stepNum} ${cls.numSoft}`}>/02</span>
                        <div className={cls.iconLine}>
                            <span className={cls.circle} />
                            <span className={cls.circle} />
                            <span className={cls.circle} />
                        </div>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>
                                Подбираем автомобиль<br />под ваши задачи
                            </div>
                            <p className={cls.cardText}>
                                Вы описываете бюджет, тип кузова, пробег и комплектацию. Мы подбираем лучшие
                                варианты с аукционов Японии, Кореи или Китая.
                            </p>
                        </div>
                    </div>

                    {/* 03 */}
                    <div className={`${cls.card} ${cls.cardSoft}`}>
                        <span className={`${cls.stepNum} ${cls.numSoft}`}>/03</span>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>Проверяем авто и делаем полный отчёт</div>
                            <p className={cls.cardText}>
                                Перед покупкой проводится диагностика и снимается подробный фото- и видеоотчёт.
                                Вы видите автомобиль ещё до оплаты.
                            </p>
                        </div>
                        <div className={cls.mediaBottom}>
                            <Image
                                src="/img/steps-3.png"
                                alt=""
                                fill
                                sizes="(min-width:1200px) 33vw, 100vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* 04 */}
                    <div className={`${cls.card} ${cls.cardDark} ${cls.cardOverlay}`}>
                        <Image
                            src="/img/steps-4.jpg"
                            alt=""
                            fill
                            sizes="(min-width:1200px) 33vw, 100vw"
                            style={{ objectFit: 'cover' }}
                        />
                        <span className={cls.stepNumDark}>/04</span>
                        <div className={cls.overlayContent}>
                            <div className={cls.cardTitleLight}>Оплата инвойса за автомобиль</div>
                            <p className={cls.cardTextLight}>
                                После одобрения выбранного варианта вы оплачиваете автомобиль по инвойсу.
                                Все платежи проходят по прозрачной и безопасной схеме через банк.
                            </p>
                        </div>
                    </div>

                    {/* 05 */}
                    <div className={`${cls.card} ${cls.cardSoft} ${cls.cardSideMedia}`}>
                        <span className={`${cls.stepNum} ${cls.numSoft}`}>/05</span>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>Оплата таможенных платежей</div>
                            <p className={cls.cardText}>
                                После доставки в Россию подготавливаем документы и сопровождаем процесс
                                таможенного оформления. Вы вносите обязательные платежи.
                            </p>
                        </div>
                        <div className={cls.sideMedia}>
                            <Image
                                src="/img/steps-5.jpg"
                                alt=""
                                fill
                                sizes="140px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* 06 */}
                    <div className={`${cls.card} ${cls.cardDark} ${cls.cardOverlay}`}>
                        <Image
                            src="/img/steps-6.png"
                            alt=""
                            fill
                            sizes="(min-width:1200px) 33vw, 100vw"
                            style={{ objectFit: 'cover' }}
                        />
                        <span className={cls.stepNumDark}>/06</span>
                        <div className={cls.overlayContent}>
                            <div className={cls.cardTitleLight}>Доставка в ваш город</div>
                            <p className={cls.cardTextLight}>
                                После выпуска с таможни передаём авто транспортной компании.
                                Вы заранее знаете сроки и место прибытия.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
