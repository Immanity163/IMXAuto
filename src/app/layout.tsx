import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import { Nunito_Sans} from "next/font/google";;
import '@/styles/global.scss' 

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
      <body className="shell">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}