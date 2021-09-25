import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const history = useHistory(); // allows change url
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault(); // dont refresh the page

        // firebase stuff
        /*
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                    history.push('/')
            })
            .catch(error => alert(error.message)) // otherwise catch error 
        */

        signInWithEmailAndPassword(auth, email, password)
        .then(auth => { // if auth not empty
            history.push('/') // redirect
        })
        .catch(error => alert(error.message)) // otherwise catch error 

        
    
    }

    const register = e => {
        e.preventDefault();
        
        // prevent page from refreshng
        // firebase stuff 

            createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // it successfully created a new user with 
                // email and password
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (

        // <Link to = '/'> ........... takes us back to Home page
        
        
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>

                    <input 
                        type = 'text' 
                        value = {email} 
                        onChange = {e =>
                            setEmail(e.target.value)
                        }
                        // what the user typed in
                    />

                    <h5>Password</h5>
                    <input 
                        type = 'password'
                        value = {password}
                        onChange = {e =>
                            setPassword(e.target.value)
                        }
                    />

                    <button 
                        type = "submit"
                        onClick = {signIn}
                        className = 'login__signInButton'>Sign in
                    </button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON D0PPLEGANGER Conditions of Use & Sale. Please see our Privacy Notic, our Cookies nOtice
                    and our Interest-Based Ads Notice :)
                </p>

                <button 
                    onClick = {register}
                    className = "login__registerButton">
                    Create your account now
                </button>
            </div>
        </div>
    )
}

export default Login
