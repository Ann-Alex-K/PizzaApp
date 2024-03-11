import styles from './Headling.module.css';
import { HeadingProps } from './Headling.props';
import cn from 'classnames';

export function Headling({ className, children, ...props }: HeadingProps) {
  return (
    <h1 className={cn(className, styles['h1'])} {...props}>
      {children}
    </h1>
  );
}
