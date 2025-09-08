"use client";

import styles from "./CarsGrid.module.scss";
import type { Car as ServerCar } from "@/types/catalog"; // твоя серверная модель Car
import CatalogCarCard, { CatalogCardCar } from "./CarCard";
import AskForm from '@/components/AskFormCatalog/AskForm'; // !!! проверь путь, если у тебя другой — поправь

const fmt = new Intl.NumberFormat("ru-RU");

function adapt(car: ServerCar): CatalogCardCar {
  let engineStr = "";
  if (car.engine && Number.isFinite(car.engine as any)) {
    const val = Number(car.engine);
    const liters = val; // если приходит 1998, можешь делить на 1000
    engineStr = `${liters.toFixed(liters % 1 === 0 ? 0 : 1)} л`;
  } else if (typeof car.engine === "string" && car.engine.trim()) {
    engineStr = car.engine;
  }

  const powerStr = car.power ? `${car.power}` : "";

  const mileageStr =
    typeof car.mileage === "number"
      ? fmt.format(car.mileage)
      : (car.mileage ?? "").toString();

  const fuel = car.fuel || "";

  const country =
    (car.country as any) === "japan" ||
    (car.country as any) === "korea" ||
    (car.country as any) === "china"
      ? (car.country as "japan" | "korea" | "china")
      : "japan";

  return {
    id: car.id,
    country,
    title: car.title,
    price: Number(car.price) || 0,
    image: car.image || "/placeholder.jpg",
    engine: engineStr,
    power: powerStr,
    mileage: mileageStr,
    fuel,
    year: Number(car.year) || 0,
    slug: (car as any).slug,
  };
}

export default function CarsGrid({ items }: { items: ServerCar[] }) {
  if (!items?.length) {
    return <div className={styles.empty}>Ничего не найдено</div>;
  }

  const capped = items.slice(0, 21);

  const nodes: React.ReactNode[] = [];
  capped.forEach((c, idx) => {
    nodes.push(<CatalogCarCard key={c.id} car={adapt(c)} />);
    if (idx === 8) {
      nodes.push(
        <div key="ask-form" className={styles.fullWidth}>
          <AskForm imageSrc="/img/askForm.png"/>
        </div>
      );
    }
  });

  return <div className={styles.grid}>{nodes}</div>;
}
