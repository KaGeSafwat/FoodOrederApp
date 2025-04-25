import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartContextProvider } from './store/cartcontext.jsx';
import { ShowModalContextProvider } from './store/ShowModalContext.jsx';
import { OrderContextProvider } from './store/ordercontext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShowModalContextProvider>
      <OrderContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </OrderContextProvider>
    </ShowModalContextProvider>
  </StrictMode>
);
