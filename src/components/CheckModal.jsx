import { useContext } from 'react';
import ShowModalContext from '../store/ShowModalContext';
import Modal from '../UI/Modal';
import { currencyFormatter } from '../utility/formatter';
import CartContext from '../store/cartcontext';
import Input from '../UI/Input';
import Button from '../UI/Button';
import classes from './CheckModal.module.css';
import OrderContext from '../store/ordercontext';
import { useFetch } from '../hooks/useFetch';

const config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function CheckModal() {
  const orderCtx = useContext(OrderContext);
  const showModalCtx = useContext(ShowModalContext);
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const { sendRequest, clearData } = useFetch(
    'http://localhost:3001/orders',
    config
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const orderData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      street: data.street,
      postalCode: data.postalCode,
      city: data.city,
      totalPrice: totalPrice,
      items: cartCtx.items,
    };

    sendRequest(JSON.stringify(orderData));

    orderCtx.setOrderData(orderData);
    event.target.reset();
    clearData();
    showModalCtx.showModalHandler('order');
  };

  return (
    <Modal
      isOpen={showModalCtx.showModal === 'checkout'}
      onClose={
        showModalCtx.showModal === 'checkout'
          ? showModalCtx.closeModalHandler
          : null
      }
    >
      <h2>Checkout</h2>
      <p className={classes.totalAmount}>
        Total Amount: {currencyFormatter.format(totalPrice)}
      </p>
      <form onSubmit={handleSubmit}>
        <Input label="Full Name" type="text" id="name" name="name" required />
        <Input
          label="Phone Number"
          type="tel"
          id="phone"
          name="phone"
          required
          minLength={11}
          maxLength={11}
        />
        <Input
          label="E-Mail Address"
          type="email"
          id="email"
          name="email"
          required
        />
        <Input label="Street" type="text" id="street" name="street" required />
        <div className={classes['control-row']}>
          <Input
            label="Postal Code"
            type="text"
            id="postalCode"
            name="postalCode"
            required
          />
          <Input label="City" type="text" id="city" name="city" required />
        </div>

        <p className={classes.modalActions}>
          <Button
            className={classes.textButton}
            type="button"
            onClick={() => showModalCtx.closeModalHandler('checkout')}
          >
            Close
          </Button>
          <Button className={classes.submitButton} type="submit">
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}
