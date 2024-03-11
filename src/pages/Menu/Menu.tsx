import styles from './Menu.module.css';
import { Headling } from '../../components/Headling/Headling';
import { Search } from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  const getMenu = async (filter: string = '') => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name: filter },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      if (err instanceof axios.AxiosError) {
        setError(err.message);
      }
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const searchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <Search
          placeholder='Введите блюдо или состав'
          onChange={searchProducts}
        />
      </div>
      <div className=''>
        {error && <>Произошла ошибка: {error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
}

export default Menu;
