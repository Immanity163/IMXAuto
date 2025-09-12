'use client';

import { useEffect, useState } from "react";

export interface Car {
  id: string;
  country: string;
  title: string;
  price: number;
  engine: number;
  power: string;
  mileage: number;
  fuel: string;
  year: number;
  image: string;
  drive: string;
  brand: string;
  model: string;
  generation: string;
}

interface CarFilters {
  country?: string;
  brand?: string;
  model?: string;
  generation?: string;
  mileageMin?: number;
  mileageMax?: number;
  priceMin?: number;
  priceMax?: number;
  engineMin?: number;
  engineMax?: number;
  yearMin?: number;
  yearMax?: number;
  drive?: string;
  fuel?: string;
}

export function useCars(limit: number = 40, filters: CarFilters = {}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const metaArray: string[] = [];

        if (filters.country) metaArray.push(`{ key: "autoCountry", value: "${filters.country}", compare: EQUAL_TO, type: CHAR }`);
        if (filters.brand) metaArray.push(`{ key: "brand", value: "${filters.brand}", compare: EQUAL_TO, type: CHAR }`);
        if (filters.model) metaArray.push(`{ key: "automodel", value: "${filters.model}", compare: EQUAL_TO, type: CHAR }`);
        if (filters.generation) metaArray.push(`{ key: "autogeneration", value: "${filters.generation}", compare: EQUAL_TO, type: CHAR }`);
        if (filters.drive) metaArray.push(`{ key: "autodrive", value: "${filters.drive}", compare: EQUAL_TO, type: CHAR }`);
        if (filters.fuel) metaArray.push(`{ key: "autoFuel", value: "${filters.fuel}", compare: EQUAL_TO, type: CHAR }`);

        if (filters.priceMin !== undefined) metaArray.push(`{ key: "autoPrice", value: "${filters.priceMin}", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.priceMax !== undefined) metaArray.push(`{ key: "autoPrice", value: "${filters.priceMax}", compare: LESS_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.engineMin !== undefined) metaArray.push(`{ key: "autoEngine", value: "${filters.engineMin}", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.engineMax !== undefined) metaArray.push(`{ key: "autoEngine", value: "${filters.engineMax}", compare: LESS_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.yearMin !== undefined) metaArray.push(`{ key: "autoYear", value: "${filters.yearMin}", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.yearMax !== undefined) metaArray.push(`{ key: "autoYear", value: "${filters.yearMax}", compare: LESS_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.mileageMin !== undefined) metaArray.push(`{ key: "automilage", value: "${filters.mileageMin}", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC }`);
        if (filters.mileageMax !== undefined) metaArray.push(`{ key: "automilage", value: "${filters.mileageMax}", compare: LESS_THAN_OR_EQUAL_TO, type: NUMERIC }`);

        const metaQuery = metaArray.length > 0 ? `metaQuery: { relation: AND, metaArray: [${metaArray.join(', ')}] }` : '';

        const query = `
          query GetCars {
            cars(first: ${limit}, where: { ${metaQuery} }) {
              nodes {
                id
                title
                cars {
                  autoEngine
                  autoFuel
                  autoImage { node { sourceUrl } }
                  autoPrice
                  autoTitle
                  autoYear
                  autoCountry
                  autoPower
                  automileage
                  autodrive
                  automodel
                  autogeneration
                  brand
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
          engine: Number(car.cars?.autoEngine || 0),
          power: car.cars?.autoPower || "",
          mileage: car.cars?.automileage || 0,
          fuel: car.cars?.autoFuel || "",
          year: Number(car.cars?.autoYear || 0),
          image: car.cars?.autoImage?.node?.sourceUrl || "",
          drive: car.cars?.autodrive || "",
          brand: car.cars?.brand || "",
          model: car.cars?.automodel || "",
          generation: car.cars?.autogeneration || "",
        }));

        setCars(wpCars);
      } catch (err) {
        console.error("Ошибка загрузки,", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [limit, JSON.stringify(filters)]);

  return { cars, loading };
}


// Usage
// export default function CarsTest() {
//   // Передаём фильтры
//   const { cars, loading } = useCars(20, {
//     country: "Germany",
//     brand: "BMW",
//     priceMin: 500000,
//     priceMax: 1500000,
//     engineMin: 1.5,
//     engineMax: 3,
//     yearMin: 2015,
//     yearMax: 2020,
//     drive: "AWD",
//     fuel: "Petrol",
//     model: "BMW",
//     generation: "F30",
//   });

//   return (
//     <div>
//       <h2>Список машин:</h2>
//       <ul>
//         {cars.map(car => (
//           <li key={car.id}>
//             {car.title} — {car.price} ₽ — {car.year} — {car.engine} л — {car.drive}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }