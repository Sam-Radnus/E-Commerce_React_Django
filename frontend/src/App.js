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
function App() {
  return (
    <Router>
    <div className="App">
      
     <Header/>
    
     <main className="py-3">
      <div className="container">
      <Routes>
      <Route path='/' element={<HomeScreen/>} exact/>
      <Route path='/product/:id' element={<ProductScreen/>} />
        </Routes>
  
      </div>
     </main>
   
     <Footer/>
 
    </div>
    </Router>
  );
}

export default App;
