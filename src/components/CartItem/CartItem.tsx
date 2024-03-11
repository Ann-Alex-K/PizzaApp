import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(cartActions.add(props.id));
  };

  const descrease = () => {
    dispatch(cartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(cartActions.delete(props.id));
  };

  return (
    <div className={styles['item']}>
      <div
        style={{ backgroundImage: `url('${props.image}')` }}
        className={styles['image']}
      ></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <span className={styles['price']}> {props.price}&nbsp;₽</span>
      </div>
      <div className={styles['actions']}>
        <button className={styles['minus']} onClick={descrease}>
          <img src='/minus-icon.svg' alt='Удалить из корзины' />
        </button>
        <div className={styles['number']}>{props.count}</div>
        <button className={styles['plus']} onClick={increase}>
          <img src='/plus-icon.svg' alt='Добавить в корзину' />
        </button>
        <button className={styles['remove']} onClick={remove}>
          <img src='/delete-icon.svg' alt='Удалить все' />
        </button>
      </div>
    </div>
  );
}
