import { useContext } from 'react';
import ShowModalContext from '../../store/ShowModalContext';
import Modal from '../../UI/modalUI/Modal';
import Button from '../../UI/normalButtonUI/Button';
import classes from './OrderModal.module.css';
import OrderContext from '../../store/ordercontext';
import CartContext from '../../store/cartcontext';
import CartModalItem from '../cartModalItemComponent/CartModalItem';
import { currencyFormatter } from '../../utility/formatter';

export default function OrderModal() {
  const showModalCtx = useContext(ShowModalContext);
  const orderCtx = useContext(OrderContext);
  const cartCtx = useContext(CartContext);

  // total amount
  const total = cartCtx.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // clear cart and close modal
  const submitHandler = () => {
    showModalCtx.closeModalHandler();
    cartCtx.clearCart();
  };

  // modal content
  let modalContent = (
    <>
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
            <CartModalItem ordered key={`${item.name}-${index}`} item={item} />
          ))}
        </ul>
      </div>
      <div className={classes.delivery}>
        <p>Delivery Name: Ahmed Mohamed</p>
        <p>Delivery Phone: 01012345678</p>
      </div>

      <div className={classes.actions}>
        <p>Total Amount: {currencyFormatter.format(total.toFixed(2))}</p>
        <Button onClick={submitHandler}>OK</Button>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={showModalCtx.showModal === 'order'}
      onClose={showModalCtx.closeModalHandler}
      className={classes.modal}
    >
      {modalContent}
    </Modal>
  );
}
