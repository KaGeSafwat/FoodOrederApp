import { useContext } from 'react';
import ShowModalContext from '../store/ShowModalContext';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import classes from './OrderModal.module.css';
import OrderContext from '../store/ordercontext';
import CartContext from '../store/cartcontext';
import CartModalItem from './CartModalItem';
import { currencyFormatter } from '../utility/formatter';
export default function OrderModal() {
  const showModalCtx = useContext(ShowModalContext);
  const orderCtx = useContext(OrderContext);
  const cartCtx = useContext(CartContext);

  const total = cartCtx.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const totalPrice = total.toFixed(2);

  const submitHandler = () => {
    showModalCtx.closeModalHandler();
    cartCtx.clearCart();
  };

  return (
    <Modal
      isOpen={showModalCtx.showModal === 'order'}
      onClose={showModalCtx.closeModalHandler}
      className={classes.modal}
    >
      <p className={classes.success}>
        Your order has been placed successfully.
      </p>
      <div className={classes.ordercontent}>
        <div className={classes.customer}>Customer Details</div>
        <p>
          <span>Name: {orderCtx.orderData.name}</span>
          <span>Phone: {orderCtx.orderData.phone}</span>
        </p>

        <p>
          <span>Email: {orderCtx.orderData.email}</span>
          <span>Postal Code: {orderCtx.orderData.postalCode}</span>
        </p>
        <p>
          <span>City: {orderCtx.orderData.city}</span>
          <span>Street: {orderCtx.orderData.street}</span>
        </p>
      </div>
      <div className={classes.items}>
        <p>Items</p>
        <ul>
          {cartCtx.items.map((item, index) => (
            <li key={index - item.id}>
              <CartModalItem ordered item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.delivery}>
        <p>Delivery Name: Ahmed Mohamed</p>
        <p>Delivery Phone: 01012345678</p>
      </div>

      <div className={classes.actions}>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Button onClick={submitHandler}>OK</Button>
      </div>
    </Modal>
  );
}
