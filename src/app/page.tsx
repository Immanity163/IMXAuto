import ReviewsSlider from "@/components/ReviewsSlider/ReviewsSlider";
import CatalogSlider from "@/components/Catalog/CatalogSlider";
import FAQ, { FaqItem } from '@/components/FAQ/FAQ';
import AskBlock from '@/components/AskForm/AskForm';
import Contacts from '@/components/Contacts/Contacts';
import Hero from '@/components/Hero/Hero';
import Advantages from "@/components/Advantages/Advantages";
import PromoWithForm from '@/components/PromoWithForm/PromoWithForm';
import Steps from '@/components/Steps/Steps';
import Perks from "@/components/Perks/Perks";

const items: FaqItem[] = [
  {
    question: 'Из каких стран вы возите автомобили?',
    answer: (
      <>
        Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. При создании генератора мы использовали небезизвестный универсальный код речей.
      </>
    ),
    defaultOpen: true,
  },
  {
    question: 'Сколько времени занимает доставка?',
    answer:
      'В среднем от 3 до 8 недель: зависит от страны, аукциона и логистики.',
  },
  {
    question: 'Почему покупать автомобиль у вас выгоднее?',
    answer:
      'У нас прямой доступ к аукционам, прозрачные комиссии и оптимизация пошлин.',
  },
  {
    question: 'Какие этапы работы?',
    answer:
      'Подбор → Проверка → Покупка → Доставка → Растаможка → Выдача клиенту.',
  },
];

export default function Home() {
  return (
    <div className="">

      <Hero />

      <CatalogSlider />

      <Advantages />

      <PromoWithForm />

      <Steps />

      <Perks />

      <ReviewsSlider />

      <div id="faq" className="container"><h2 className='section-title'>FAQ</h2></div>
      <div className="container"><FAQ items={items} /></div>

      <AskBlock imageSrc="/img/askForm.png" />

      <Contacts
        contacts={{
          phoneLabel: '+7 (900) 000-00-00',
          phoneHref: 'tel:+79000000000',
          address: 'г. Москва, ул. Мира, д. 000',
          whatsappHref: 'https://wa.me/7900',
          telegramHref: 'https://t.me/',
        }}
        mapSlot={
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa5669d7798f547e036a18702963d5df5f9e3881e93672f867792ad8fa674d81b&amp;source=constructor" width="100%" height="100%">

          </iframe>
        }
      />
    </div>
  );
}
