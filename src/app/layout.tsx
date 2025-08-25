import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import { Nunito_Sans} from "next/font/google";;
import '@/styles/global.scss' 
import Script from "next/script";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"], // чтобы работала кириллица
  weight: ["600", "700", "800"], // нужные веса
  variable: "--font-nunito",     // CSS-переменная
});



// export const metadata: Metadata = {
//   title: "IMX AUTO | Главная",
//   description: "Покупка авто из-за рубежа",
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://imxauto.ru"), 
  title: {
    default: "IMX AUTO | Главная",
    template: "IMX AUTO | %s ", 
  },
  description: "Помогаем купить автомобиль из-за рубежа с гарантией и безопасной доставкой.",
  keywords: ["купить авто из-за рубежа", "авто под заказ", "IMX AUTO", "автомобили Европа США"],
  authors: [{ name: "студия «Сопряжение»" }],
  creator: "студией «Сопряжение»",
  openGraph: {
    type: "website",
    url: "https://imxauto.ru",
    title: "IMX AUTO | Покупка авто из-за рубежа",
    description: "Полный цикл покупки автомобилей из-за границы: подбор, проверка, доставка.",
    siteName: "IMX AUTO",
    images: [
      {
        url: "/og-image.jpg", // заранее положи картинку в public/
        width: 1200,
        height: 630,
        alt: "IMX AUTO",
      },
    ],
  },
  alternates: {
    canonical: "https://imxauto.ru", // канонический адрес
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={nunitoSans.variable}>
      <head>
        <meta name="yandex-verification" content="1aaa6a5c3c5ece14" />
      </head>
      <body className="shell">
        <Header />
        <main className="main">{children}</main>
        <Footer />
                {/* Яндекс.Метрика */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=103804972", "ym");

              ym(103804972, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103804972" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        {/* /Яндекс.Метрика */}
      </body>
    </html>
  )
}