import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product() {
  //   const { id } = useParams();
  //   const data = useLoaderData() as Product; //для дозагрузки при переходе
  const data = useLoaderData() as { data: Product }; //для дозагрузки при переходе при использовании defer

  return (
    <Suspense fallback={<>Loading...</>}>
      <Await resolve={data.data}>
        {({ data }: { data: Product }) => <>Product {data.name}</>}
      </Await>

      {/* Product {data.name} */}
    </Suspense>
  );
}
