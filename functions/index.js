const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");

// now we need secret key

const stripe =  require("stripe")('sk_test_51JcuykHnG9pa08arVGexf6xyTZSJR4VgCFelDf9WeGlX2UP23yv4Nu51kzGGusmL6vb0JbBnV81Jv40exnSSEIIo00GJORwSpV')


// API

// -App config
const app = express();

// -middlewares
app.use(cors({ origin: true }));
app.use(express.json());

    // emulate it


// -API routes
app.get('/', (request, response) => 
    response.status(200).send('This is Tendo Maya')) // test

app.get('/mayakuro', (request, response) => 
    response.status(200).send('ma Claudine')) // test

// we used this in 'payments.js'
app.post('/payments/create', async (request, response) => {
    const total = request.query.total; // this is the '?total' in payment.js
    
    
    console.log('--------------------------------------------\n\n\nPayment Request Received!!!\nBanzai!! Arigatou :>\n', total, "\n\n\n--------------------------------------------")
    
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "usd",
    });

    // OK - created a payment attempt
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})




// -Listen command
exports.api = functions.https.onRequest(app);

// example end point (local)
// http://localhost:5001/again-d5564/us-central1/api

// http://localhost:5001/again-d5564/us-central1/api/mayakuro