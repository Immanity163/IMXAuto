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
      <div className="container"><FAQ  /></div>

      <AskBlock imageSrc="/img/askForm.png" />

      <Contacts
        mapSlot={
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa5669d7798f547e036a18702963d5df5f9e3881e93672f867792ad8fa674d81b&amp;source=constructor" width="100%" height="100%">

          </iframe>
        }
      />
    </div>
  );
}
