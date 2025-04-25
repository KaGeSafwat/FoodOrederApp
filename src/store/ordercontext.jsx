import { createContext, useState } from 'react';

const OrderContext = createContext({
  orderData: {},
  setOrderData: () => {},
});

export const OrderContextProvider = ({ children }) => {
  const [orderData, setOrderData] = useState({});

  const orderContextCtx = {
    orderData,
    setOrderData,
  };

  return (
    <OrderContext.Provider value={orderContextCtx}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
