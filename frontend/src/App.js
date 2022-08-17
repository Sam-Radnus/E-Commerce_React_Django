import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './components/Footer';
import ProductScreen from "./screens/ProductScreen";
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import {Container,Row,Col} from 'react-bootstrap/Container'
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
function App() {
  return (
    <Router>
    <div className="App">
      
     <Header/>
    
     <main className="py-3">
      <div className="container">
      <Routes>
      <Route path='/' element={<HomeScreen/>} exact/>
      <Route path='/login' element={<LoginScreen/>}></Route>
      <Route path='/register' element={<RegisterScreen/>}></Route>
      <Route path='/profile' element={<ProfileScreen/>}></Route>
      <Route path='/shipping' element={<ShippingScreen/>}></Route>
      <Route path='/payment' element={<PaymentScreen/>}></Route>
      <Route path='/placeorder' element={<PlaceOrderScreen/>}></Route>
      <Route path='/order/:id' element={<OrderScreen/>}></Route>
      <Route path='/product/:id' element={<ProductScreen/>} />
      <Route path='/cart' element={<CartScreen/>} />
      <Route path='/cart/:id/qty=:qty' element={<CartScreen/>} />
        </Routes>
  
      </div>
     </main>
   
     <Footer/>
 
    </div>
    </Router>
  );
}

export default App;
