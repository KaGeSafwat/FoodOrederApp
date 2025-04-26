import Header from './components/headerComponent/Header';
import Items from './components/itemsComponent/Items';
import CartModal from './components/cartModalComponent/CartModal';
import CheckModal from './components/checkModalComponent/CheckModal';
import OrderModal from './components/orderModalComponent/OrderModal';

function App() {
  return (
    <>
      <Header />
      <OrderModal />
      <CheckModal />
      <CartModal />
      <main>
        <Items />
      </main>
    </>
  );
}

export default App;
