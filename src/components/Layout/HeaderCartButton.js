import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CanIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


  const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ''}`
  
  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false)
    }, 300);

    return () => {
      clearTimeout(timer)
    };
  }, [items]);
 
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfItems}
      </span>
    </button>
  )
};

export default HeaderCartButton;