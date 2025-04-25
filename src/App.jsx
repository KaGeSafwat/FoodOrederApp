import Header from './components/Header';
import Items from './components/Items';
import CartModal from './components/CartModal';
import CheckModal from './components/CheckModal';
import OrderModal from './components/OrderModal';
function App() {
  return (
    <>
      <Header />
      <OrderModal />
      <CheckModal />
      <CartModal />
      <Items />
    </>
  );
}

export default App;
