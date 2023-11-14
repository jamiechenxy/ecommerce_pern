import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Route, RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom';
import Root from '../components/Root/Root';
import Register from '../components/Register/Register';
import User from '../components/User/User';
import Login from '../components/Login/Login';
import Products from '../components/Product/Products';
import ProductDetails from '../components/Product/ProductDetails';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import Orders from '../components/Orders/Orders';
import OrderDetails from '../components/Orders/OrderDetails';
import { loadUserInfo, selectSessionHasError, selectSessionIsLoading, selectUser } from '../features/sessionSlice';
import PaymentIntermedia from '../components/Payment/PaymentIntermedia';
import { UserInfoContext } from './Context';
import { loadFilter } from '../features/productSlice';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root/> } >
    <Route path='product' element={ <Products/> } />
    <Route path='product/:productId' element={ <ProductDetails /> } />
    <Route path='register' element={ <Register /> } />
    <Route path='login' element={ <Login /> } />
    <Route path=':userName' element={ <User /> } >
      {/* <Route path='profile' element={ <Profile /> } > */}
        {/* <Route path='edit' element={ <EditProfileForm /> } /> */}
      {/* </Route> */}
    </Route>
    <Route path='cart' element={ <Cart /> } />
    <Route path='checkout' element={ <Checkout /> } />
    <Route path='checkout/:userName/feedback' element={ <PaymentIntermedia /> }/>
    <Route path='orders' element={ <Orders /> } />
    <Route path='orders/:orderId' element={ <OrderDetails /> } />
  </Route >
));


function App() {
  const userInfo = useSelector(selectUser);
  const sessionIsLoading = useSelector(selectSessionIsLoading);
  const sessionHasError = useSelector(selectSessionHasError);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo===undefined) {
      dispatch(loadUserInfo());
    }

    dispatch(loadFilter());

  }, [dispatch]);

  if (sessionIsLoading) {
    return <div>Loading...</div>
  };

  if (sessionHasError) {
    return <div>Whoops...Somthing went wrong...</div>
  };


  return (
    <UserInfoContext.Provider value={userInfo}>
      <RouterProvider router={router} />
    </UserInfoContext.Provider>
  )
}

export default App;
