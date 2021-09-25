import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './Orders.css'
import { query, orderBy } from "firebase/firestore"; 
import { collection, onSnapshot, doc } from "firebase/firestore";
import { useStateValue } from './StateProvider';
import Order from './Order';


function Orders() {

    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        console.log("USER: ", user);
        if(user)
        {
            console.log("HERE: \n\n\n");
            const DB = collection(db, 'users'); // checked
            console.log("\n\nDB >>>   ", DB);
            const DB2 = doc(DB, user?.uid);
            console.log("\n\nDB2 >>>   ", DB2);
            
            const DB3 = collection(DB2, "orders");
            console.log("\n\nDB3 >>>   ", DB3);

            const q = query(DB3, orderBy("created", 'desc'));
            {console.log("\n\n\nq: ", q, "\n\n\n-----------")}

            const SNAP = onSnapshot(q, snapshot => (
                
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
            console.log("\n\n\nSNAP: ", SNAP, "\n\n\n-----------")
        }
        else {
            setOrders([])
        }
        

        /*

        const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
            console.log("Current data: ", doc.data());
        });

        ------------------

        db.collection("cities").doc("SF")
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
        });

        ----------------------------

        const DB = collection(db, 'users'); 
            console.log("\n\nDB >>>   ", DB); // inspect and keep selecting 'id'

        const DB2 = doc(DB, user?.uid); // doc is type Ec
        console.log("\n\nDB2 >>>   ", DB2);

        const DB3 = collection(DB2, 'orders');
        console.log("\n\nD3 >>>   ", DB3);

        const q = query(DB3, orderBy("created", 'desc'));
        */

    }, [user]) // run once if you keep the brackets empty

    return (
        <div className = 'orders'>
            <h1>Your Orders</h1>
            
            <div className = 'orders__order'>

                {console.log("HERE22222\n\n\n")}
                {orders?.map(order => (
                    <Order order = {order} />
                    
                ))}
            </div>
        </div>
    )
}

export default Orders
