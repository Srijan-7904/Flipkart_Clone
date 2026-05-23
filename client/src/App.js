import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import { Box, styled } from '@mui/material'

//components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import Orders from './Components/Orders/Orders';
import Wishlist from './Components/Wishlist/Wishlist';
import AllProducts from './Components/Products/AllProducts';
import Checkout from './Components/Checkout/Checkout';
import OrderConfirmation from './Components/Checkout/OrderConfirmation';

const MainContent = styled(Box)(({ theme }) => ({
  marginTop: 54,
  [theme.breakpoints.down('sm')]: {
    marginTop: 100
  }
}));

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <MainContent>
            <Routes>
              <Route path= '/'                  element={<Home />} />
              <Route path= '/cart'              element={<Cart />} />
              <Route path= '/product/:id'       element={<DetailView />} />
              <Route path= '/orders'            element={<Orders />} />
              <Route path= '/wishlist'          element={<Wishlist />} />
              <Route path= '/products'          element={<AllProducts />} />
              <Route path= '/checkout'          element={<Checkout />} />
              <Route path= '/order-confirmation' element={<OrderConfirmation />} />
              <Route path= '*'                  element={<NotFound />} />
            </Routes>
          </MainContent>
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
