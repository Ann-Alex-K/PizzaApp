import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import { forwardRef } from 'react';
import cn from 'classnames';

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { className, isValid = true, ...props },
  ref
) {
  return (
    <div className={cn(className, styles['input-wrapper'])}>
      <img
        className={styles['icon']}
        src='/search-icon.svg'
        alt='Иконка лупы'
      />
      <input
        className={cn(styles['input'], className, {
          [styles['invalid']]: !isValid,
        })}
        ref={ref}
        {...props}
      />
    </div>
  );
});
