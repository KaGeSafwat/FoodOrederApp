import classes from './Item.module.css';
import AddButton from '../../UI/addButtonUI/AddButton';
import { useContext } from 'react';
import CartContext from '../../store/cartcontext.jsx';
import { currencyFormatter } from '../../utility/formatter';

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
        <h4>{currencyFormatter.format(item.price)}</h4>
      </div>
      <div className={classes.info}>
        <AddButton onClick={() => cartCtx.addItem(item)} />
      </div>
    </div>
  );
}
