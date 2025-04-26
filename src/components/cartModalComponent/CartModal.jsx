import { useContext } from 'react';
import CartContext from '../../store/cartcontext.jsx';
import ShowModalContext from '../../store/ShowModalContext.jsx';
import Modal from '../../UI/modalUI/Modal.jsx';
import classes from './CartModal.module.css';
import CartModalItem from '../cartModalItemComponent/CartModalItem.jsx';
import { currencyFormatter } from '../../utility/formatter.js';

export default function CartModal() {
  const cartCtx = useContext(CartContext);
  const showModalCtx = useContext(ShowModalContext);

  // total price of the cart`s items
  const totalPrice = cartCtx.items.reduce((currentPrice, item) => {
    return currentPrice + item.price * item.quantity;
  }, 0);

  // cart content in case there are items in the cart
  let cartContent = (
    <>
      <ul className={classes.cartContent}>
        {cartCtx.items.map((item, index) => (
          <CartModalItem
            key={`${item.id}-${index}`}
            item={item}
            addItemHandler={() => cartCtx.addItem(item)}
            removeItemHandler={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <div className={classes.summary}>
        <span className={classes.totalPrice}>
          Total Price: {currencyFormatter.format(totalPrice)}
        </span>
        <div className={classes.modalActions}>
          <button
            className={classes.close}
            onClick={showModalCtx.closeModalHandler}
          >
            Continue Shopping
          </button>
          <button
            className={classes.checkout}
            onClick={() => showModalCtx.showModalHandler('checkout')}
            disabled={totalPrice === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );

  // cart content in case there are no items in the cart
  if (cartCtx.items.length === 0) {
    cartContent = (
      <div className={classes.emptyCart}>
        <p>Your cart is empty</p>
        <button
          className={classes.continueShopping}
          onClick={showModalCtx.closeModalHandler}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <Modal
      isOpen={showModalCtx.showModal === 'cart'}
      onClose={
        showModalCtx.showModal === 'cart'
          ? showModalCtx.closeModalHandler
          : null
      }
      className={classes.modal}
    >
      <div className={classes.modalContent}>
        <h2 className={classes.modalHeader}>Your Cart</h2>
        {cartContent}
      </div>
    </Modal>
  );
}
