import classes from './CartModalItem.module.css';
import { currencyFormatter } from '../../utility/formatter';
export default function CartModalItem({
  item,
  addItemHandler,
  removeItemHandler,
  ordered,
}) {
  // item in cart modal
  let content = (
    <li className={classes.item}>
      <div className={classes.itemInfo}>
        {`${item.name} - ${currencyFormatter.format(item.price)}`}
      </div>
      <div className={classes.actions}>
        <button onClick={() => addItemHandler(item)}>
          <i className="fa-solid fa-plus"></i>
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => removeItemHandler(item.id)}>
          <i className="fa-solid fa-minus"></i>
        </button>
      </div>
    </li>
  );

  // item in order modal
  if (ordered) {
    content = (
      <li className={classes.item}>
        <div className={classes.orderedItem}>
          <div className={classes.name}>{item.name}</div>
          <div className={classes.quantity}>{item.quantity}</div>
        </div>
      </li>
    );
  }

  return <>{content}</>;
}
