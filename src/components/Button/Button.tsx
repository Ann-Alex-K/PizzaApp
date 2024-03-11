import styles from './Button.module.css';
// import { FC } from 'react';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

// export const ButtonAlt: FC<ButtonProps> = ({className, children, ...props }) => {
//     return (
//         <button {...props} className={cn('button accent', className)}>
//           {children}
//         </button>
//       );
// }

function Button({ children, className, appearence = 'small', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        styles['button'],
        styles['accent'],
        className, {
          [styles['small']]: appearence === 'small',
          [styles['big']]: appearence === 'big'
        }
      )}
    >
      {children}
    </button>
  );
}

export default Button;
