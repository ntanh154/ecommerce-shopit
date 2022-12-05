import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from './components/Layout/Header/Header';
import Home from './components/Home/Home';
import Profile from './components/user/Profile';
import UsePage from './components/user/UsePage/UsePage';
import DashBoard from './components/admin/Dashboard';
import ProtectedRouter from './components/route/ProtectedRouter';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import ProductReviews from './components/admin/ProductReviews';
import UpdateProduct from './components/admin/UpdateProduct';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import Contact from './components/Contact';
import ListOrders from './components/order/ListOrders'
import CategoryList from './components/admin/CatagoryList';
import NewCategory from './components/admin/NewCategory';
import OrdersList from './components/admin/OrdersList';
import UsersList from './components/admin/UsersList';
import NoMatch from './components/NoMatch/NoMatch';
import Footer from './components/Layout/Footer/Footer';

import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "./axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");


  useEffect(() => {
    store.dispatch(loadUser());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };
    function getStripApiKey() {
      let data = {};
      axios.get("/api/v1/stripeapi", config)
        .then(res => data = res)
      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);


  return (
    <>
      <div className="App">
        <Header />
        <div className="" style={{ marginTop: '100px' }}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={UsePage} exact />
            <Route path="/search/:keyword" component={Home} />
            <ProtectedRouter path="/dashboard" isAdmin={true} component={DashBoard} exact />

            <Route path="/contact" component={Contact} exact />
            <ProtectedRouter path="/shipping" component={Shipping} />

            <ProtectedRouter path="/confirm" component={ConfirmOrder} exact />
            <ProtectedRouter path="/orders/me" component={ListOrders} exact />

            <ProtectedRouter path="/me" component={Profile} exact />
            {stripeApiKey && (
              <Elements stripe={loadStripe("hello")}>
                <ProtectedRouter path="/payment" component={Payment} />
              </Elements>
            )}
            <Route path="/product/:id" component={ProductDetails} exact />
            <Route path="/cart" component={Cart} exact />
            <ProtectedRouter
              path="/admin/products"
              isAdmin={true}
              component={ProductsList}
              exact
            />

            <ProtectedRouter
              path="/admin/product"
              isAdmin={true}
              component={NewProduct}
              exact
            />
            <ProtectedRouter
              path="/admin/category"
              isAdmin={true}
              component={CategoryList}
              exact
            />
            <ProtectedRouter
              path="/admin/category/new"
              isAdmin={true}
              component={NewCategory}
              exact
            />

            <ProtectedRouter
              path="/admin/orders"
              isAdmin={true}
              component={OrdersList}
              exact
            />
            <ProtectedRouter
              path="/admin/users"
              isAdmin={true}
              component={UsersList}
              exact
            />
            <ProtectedRouter
              path="/admin/product/:id"
              isAdmin={true}
              component={UpdateProduct}
              exact
            />

            <ProtectedRouter
              path="/admin/reviews"
              isAdmin={true}
              component={ProductReviews}
              exact
            />
            {/* <ProtectedRoutee
              path="/admin/product/:id"
              isAdmin={true}
              component={UpdateProduct}
              exact
            /> */}
            {/* <Route path="*">
              <NoMatch />
            </Route> */}
          </Switch>
          <Footer />
        </div>


      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
