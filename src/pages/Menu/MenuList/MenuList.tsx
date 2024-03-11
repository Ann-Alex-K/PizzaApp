import { ProductCard } from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles.wrapper}>
      {products.map(item => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          description={item.ingredients.join(', ')}
          rating={item.rating}
          image={item.image}
        />
      ))}
    </div>
  );
}
