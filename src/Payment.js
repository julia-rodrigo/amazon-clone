import { async } from '@firebase/util';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css";
import { getBasketTotal } from './Reducer';
import { useStateValue } from "./StateProvider";
import axios from './axios';
import { db } from './firebase';
import { collection, doc, setDoc } from "firebase/firestore"; 
//import "firebase/compat/firestore"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getDoc } from 'firebase/firestore'


function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [clientSecret, setClientSecret] = useState(true);

    const stripe = useStripe();
    const elements = useElements();

    // runs when the payment loads as well 
    //as when the variable inside the [] changes, 
    // in this case the 'basket'

    useEffect(() => {
        // generate the special strike secret 
        // which allows us to charge a customer

        // whener the basket changes we need a new secret
        // we need to tell stripe that the price may have changed

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',

                // stripe expect the total in a currency sub units
                url: `payments/create?total=${getBasketTotal(basket)*100}`
                // used in index.js in functions folder
                // this is the last request
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log("The SecREt is: ", clientSecret);

    const handleSubmit = async (event) => {
        // stripe stuff

        // when you hit the enter, 
        //it will block clicking again
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                // card payment
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            
            // https://firebase.google.com/docs/firestore/query-data/get-data
            
            /*
            db
                .collection('users')
                .doc(user?.uid) // uid not id, check in inspect
                .collection(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

                // push into database, import the db from local firebase
                // taget the db collections belonging to the users, collections doc data structure sequel database
                // doc we are anccessing is the user's uid 

                go to collection, to the users, to the collections of orders of that users, 
                // go to the doc and use the payment intent . id and then
                // set....
            */

                const DB = collection(db, 'users'); 
                console.log("\n\nDB >>>   ", DB); // inspect and keep selecting 'id'

                const DB2 = doc(DB, user?.uid); // doc is type Ec
                console.log("\n\nDB2 >>>   ", DB2);

                const DB3 = collection(DB2, "orders");
                console.log("\n\nD3 >>>   ", DB3);

                const DB4 = doc(DB3, paymentIntent.id);
                console.log("\n\nD4 >>>   ", DB4);

                setDoc(DB4, { // requires type ec
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created // time stamp
                });

                /*
                const DB = collection(db, 'users'); // checked
                const DB2 = doc(DB, user?.uid);
                const DB3 = collection(DB2, paymentIntent.id);

                setDoc(doc(DB3, user?.uid), {
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created 
                });

            /*
            
            -------------------

            const ref = doc(db, "cities", "LA").withConverter(cityConverter);
            await setDoc(ref, new City("Los Angeles", "CA", "USA"));

            ---------------

            db.collection("cities").doc("LA")
            .withConverter(cityConverter)
            .set(new City("Los Angeles", "CA", "USA"));


            await setDoc(doc(db, "cities", "new-city-id"), data); // 9
            db.collection("cities").doc("new-city-id").set(data); // 8
            */

            

            setSucceeded(true); // if transation is good, 
            setError(null);         // set error to null 
            setProcessing(false) // nothing processing

            


            // empty basket
            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders'); 
            // you dont want them to go to payment page again, so no history.push()
        })
    }

    const handleChange = event => {
        // stripe stuff
        // display error as customer types card details

        // if event is empty, then disable the button
        setDisabled(event.empty);

        //  if theres an error, show error otherwise show nothing
        setError(event.error ? event.error.message : "");

    }

    return (
        <div className = "payment">
            <div className = "payment__container">

                <h1>
                    🚚 Checkout {
                        <Link to = "/checkout">
                            ({basket?.length} items)
                        </Link>
                    }
                </h1>



                <div className = 'payment__section'>
                    <div className = 'payment__title'>
                        <h3> Delivery Address</h3>
                    </div>

                    <div className = 'payment__address'>
                        <p>{user?.email}</p>
                        <p>Starlight academy</p>
                        <p>I love potatoes</p>
                    </div>
                </div>

                <div className = 'payment__section'>
                    <div className = 'payment__title'>
                        <h3> Review Items and delivery</h3>
                    </div>
                    <div className = 'payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id = {item.id}
                                title = {item.title}
                                image = {item.image}
                                price = {item.price}
                                rating = {item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className = 'payment__section'>
                    <div className = 'payment__title'>
                        <h3> Payment Method</h3>
                    </div>
                    <div className = 'payment__details'>
                        <form onSubmit = {handleSubmit}>
                            <CardElement onChange = {handleChange}/>
                            <div className = 'payment__priceContainer'>
                                <CurrencyFormat
                                    renderText = {(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale = {2}
                                    value = {getBasketTotal(basket)}
                                    displayType = {"text"}
                                    thousandSeparator = {true} // comma
                                    prefix = {"$"} //the currency
                                />

                                <button disabled = {processing || disabled || succeeded}>
                                    <span>
                                        {
                                            processing ? 
                                            <p>Processing</p>:
                                            "Bye Now"
                                        }
                                    </span>
                                </button>
                            </div>
                            
                            {/* if anything wrong with card details, 
                            only then show div with error */}

                            {error && <div> {error} </div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
