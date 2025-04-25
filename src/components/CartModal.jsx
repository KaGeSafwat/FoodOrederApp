import { useContext, useEffect, useState } from 'react';
import CartContext from '../store/cartcontext.jsx';
import ShowModalContext from '../store/ShowModalContext.jsx';
import Modal from '../UI/Modal';
import classes from './CartModal.module.css';
import CartModalItem from './CartModalItem';
import { currencyFormatter } from '../utility/formatter';

export default function CartModal() {
  const cartCtx = useContext(CartContext);
  const showModalCtx = useContext(ShowModalContext);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showModalCtx.showModal === 'cart') {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showModalCtx.showModal]);

  const totalPrice = cartCtx.items.reduce((currentPrice, item) => {
    return currentPrice + item.price * item.quantity;
  }, 0);

  const totalPriceWithDecimals = totalPrice.toFixed(2);
  const addItemHandler = (item) => {
    cartCtx.addItem(item);
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const handleCheckout = () => {
    if (totalPrice > 0) {
      showModalCtx.showModalHandler('checkout');
    }
  };

  return (
    <Modal
      isOpen={showModalCtx.showModal === 'cart'}
      onClose={
        showModalCtx.showModal === 'cart'
          ? showModalCtx.closeModalHandler
          : null
      }
      className={`${classes.modal} ${isAnimating ? classes.animate : ''}`}
    >
      <div className={classes.modalContent}>
        <h2 className={classes.modalHeader}>Your Cart</h2>
        {cartCtx.items.length === 0 ? (
          <div className={classes.emptyCart}>
            <p>Your cart is empty</p>
            <button
              className={classes.continueShopping}
              onClick={showModalCtx.closeModalHandler}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul className={classes.cartContent}>
              {cartCtx.items.map((item, index) => (
                <li key={index - item.id}>
                  <CartModalItem
                    item={item}
                    addItemHandler={addItemHandler}
                    removeItemHandler={removeItemHandler}
                  />
                </li>
              ))}
            </ul>
            <div className={classes.summary}>
              <span className={classes.totalPrice}>
                Total Price: {currencyFormatter.format(totalPriceWithDecimals)}
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
                  onClick={handleCheckout}
                  disabled={totalPrice === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
