import React, { Component } from 'react';
import {Switch,Route, Router} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Details from './components/Details';
import Cart from './components/cart/Cart';
import Default from './components/Default';
import About from './components/About';
import Modal from './components/Modal';


class App extends Component{
  render(){
  return <React.Fragment>
  <Navbar></Navbar>
  <Switch>
    <Route exact path="/details" component={Details}/>
    <Route exact path="/cart" component={Cart}/>
    <Route exact path="/about" component={About}/>
    <Route exact path="/" component={ProductList}/>
    <Route component={Default}/>
  </Switch>
  <Modal />

</React.Fragment>;
}
}

export default App;
