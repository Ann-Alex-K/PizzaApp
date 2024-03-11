import { useSelector } from 'react-redux';
import { Headling } from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import { CartItem } from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((state: RootState) => state.cart.items);
  console.log(items);

  const getItems = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const promises = items.map(item => getItems(item.id));
    const data = await Promise.all(promises);
    setCartProducts(data);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling className={styles['headling']}>Корзина</Headling>
      {items.map(item => {
        const product = cartProducts.find(p => p.id === item.id);
        if (!product) return;
        return <CartItem key={item.id} count={item.count} {...product} />;
      })}
    </>
  );
}
