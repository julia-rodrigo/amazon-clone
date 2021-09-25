// to start: 
// cd amazon-clone
// npm start

// npm i firebase
// npm install -g firebase-tools
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
// firebase login
// firebase init
// npm run build
// firebase deploy


import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

// public key from stripe.com
const promise = loadStripe(
  "pk_test_51JcuykHnG9pa08arBBkj5lYAgotVVz1akoeI2cQNSsBg32kBidkb7rpqAKK3MqjgX4F2NY2bcYkOo9HQF5ZKYe5U00yf8WqQ0W"
);

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => { // sits here and listen
    // will only run once when the app component loads

    auth.onAuthStateChanged((authUser) => { 
      // as soon as app loads, it will always run this listener
      // it will give user
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in OR the user was logged in
        // if you refresh the page, it will still log you in

        dispatch({ 
          type: "SET_USER",
          user: authUser,
        });
      } 
      
      else {
        // the user is logged out
        dispatch({
          type: "SET_USER", // removes user from the data layer
          user: null, // user is now empty
        });
      }
    });
  }, []);  // anything in the square brackets will load
  // if you put commonent in brackets, 
  // it will take effect after these component changes

  return (
    // BEM
    // http://localhost:3000/checkout
    // make sure main/default route is at the bottom
    
    <Router>
      <div className="app">
        
        <Switch>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>


          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          
          <Route path="/payment">
            <Header />
            {/* higher order function: 
            wraps the payment elements */}
            <Elements stripe = {promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
