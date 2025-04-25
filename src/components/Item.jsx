import classes from './Item.module.css';
import { useContext } from 'react';
import CartContext from '../store/cartcontext.jsx';
import { currencyFormatter } from '../utility/formatter';

export default function Item({ item }) {
  const cartCtx = useContext(CartContext);
  return (
    <div className={classes.box}>
      <div className={classes.image}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={classes.text}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{currencyFormatter.format(item.price)}</p>
      </div>
      <div className={classes.info}>
        <button onClick={() => cartCtx.addItem(item)}>Add to Cart</button>
      </div>
    </div>
  );
}
