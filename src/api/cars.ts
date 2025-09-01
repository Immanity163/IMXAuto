// hooks/useCars.ts
'use client';

import { useEffect, useState } from "react";

export interface Car {
  id: string;
  country: string;
  title: string;
  price: number;
  engine: string;
  power: string;
  mileage: number;
  fuel: string;
  year: number;
  image: string;
}

export function useCars(limit: number = 40) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const query = `
          query GetCars {
            cars(first: ${limit}) {
              nodes {
                id
                title
                cars {
                  autoEngine
                  autoFuel
                  autoImage {
                    node {
                      sourceUrl
                    }
                  }
                  autoPrice
                  autoTitle
                  autoYear
                  autoCountry
                  autoPower
                  automileage
                }
              }
            }
          }
        `;

        const res = await fetch("https://imxauto.ru/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const json = await res.json();
        const wpCars: Car[] = json.data.cars.nodes.map((car: any) => ({
          id: car.id,
          country: car.cars?.autoCountry || "",
          title: car.title || "",
          price: Number(car.cars?.autoPrice || 0),
          engine: car.cars?.autoEngine || "",
          power: car.cars?.autoPower || "",
          mileage: car.cars?.automileage || 0,
          fuel: car.cars?.autoFuel || "",
          year: Number(car.cars?.autoYear || 0),
          image: car.cars?.autoImage?.node?.sourceUrl || "",
        }));

        setCars(wpCars);
      } catch (err) {
        console.error("Ошибка загрузки машин:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [limit]);

  return { cars, loading };
}


//  Usage
//
//
// import { useCars } from "@/api/cars";
// export default function CarsTest() {
//   const { cars, loading } = useCars(10);

//   return (
//     <div>
//       <h2>Список машин:</h2>
//       <ul>
//         {cars.map(car => (
//           <li key={car.id}>
//             {car.title} — {car.price} ₽ — {car.year}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }