'use client';

import Image from 'next/image';
import React from 'react';
import cls from './Steps.module.scss';

const Steps = () => {
    return (
        <section id='steps' className={cls.stepsSection}>
            <div className="container">
                <h2 className="section-title">Этапы работы с нами</h2>

                <div className={cls.row}>
                    <div className={cls.card}>
                        <div className={cls.mediaTop}>
                            <Image
                                src="/img/steps-1.png"
                                alt=""
                                fill
                                sizes="(min-width:1200px) 33vw, 100vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <span className={cls.stepNum}>/01</span>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>Заключаем с вами договор</div>
                            <p className={cls.cardText}>
                                На первом этапе мы оформляем договор, где прописаны все условия покупки. Это ваша гарантия безопасности и прозрачности на каждом этапе
                            </p>
                        </div>
                    </div>

                    <div className={`${cls.card} ${cls.cardSoft}`}>
                        <div className={cls.mediaTop}>
                            <Image
                                src="/img/steps-2.png"
                                alt=""
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <span className={`${cls.stepNum} ${cls.numSoft}`}>/02</span>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>
                                Подбираем автомобиль<br />под ваши задачи
                            </div>
                            <p className={cls.cardText}>
                                Вы описываете, что именно вам нужно — по бюджету, типу кузова, пробегу и комплектации. Мы подбираем лучшие предложения с аукционов Японии, Кореи или Китая
                            </p>
                        </div>
                    </div>

                    <div className={`${cls.card} ${cls.cardSoft}`}>
                        <span className={`${cls.stepNum} ${cls.numSoft}`}>/03</span>
                        <div className={cls.body}>
                            <div className={cls.cardTitle}>Проверяем авто и делаем полный отчёт</div>
                            <p className={cls.cardText}>
                                Перед покупкой проводится техническая диагностика, а также снимается подробный фото- и видеоотчет. Вы видите автомобиль ещё до оплаты и принимаете решение уверенно
                            </p>
                        </div>
                        <div className={cls.mediaBottom}>
                            <Image
                                src="/img/steps-3.png"
                                alt=""
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center -95px' }}
                            />
                        </div>
                    </div>

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
                                sizes="122px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

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
                                Сразу после выпуска с таможни мы передаём автомобиль в транспортную компанию. Он отправляется в ваш регион, и вы заранее знаете сроки и место прибытия
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;
