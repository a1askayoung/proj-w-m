import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { useReducer } from 'react';
import { createContext } from "react";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ACTIONS_USER } from '../helpers/consts';

const authContext=createContext()
export const useAuthContext=()=>useContext(authContext)

const INIT_STATE={
    user: null,
}

const reducer=(state, action)=>{
    switch (action.type) {
        case ACTIONS_USER.CHECK_USER:
            return {...state, user: action.payload}                             //? USER #3
        default:
        return state;
    }
}

function AuthContext({children}) {
    const [state, dispatch]=useReducer(reducer, INIT_STATE)
    
    const googleProvider=new GoogleAuthProvider();                              //! authorization with Google #1
    const navigate=useNavigate() 


    const authWithGoogle=async()=>{
        try {
            await signInWithPopup(auth, googleProvider)                                             //! authorization with Google #2. next in register.jsx and app.js
        } catch (error) {
            console.log(error);
        }
    }

    const register=(email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)                        //! registration with Email #1. next in register.jsx and app.js
    }

    const checkUser=()=>{
        onAuthStateChanged(auth, (user)=>{                                              //? USER #2. first in consts.js
            dispatch({
                type: ACTIONS_USER.CHECK_USER,
                payload: user,
            })
        })
    }

    useEffect(()=>{
        checkUser()                                                                             //? USER #4
    },[])

    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)                                        // LOGIN #1
    }

    const logOut=async()=>{
        try {
            await signOut(auth)                                                                         // LOGOUT #1
        } catch (error) {
            console.log(error);
        }
    }

    const values={
        authWithGoogle,
        register,
        logIn,                                                                                           // LOGIN #2. next in Login.jsx
        logOut,                                                                                         // LOGOUT #2. next in Header.jsx
        user: state.user,                                                                          //? USER #5. next in header.jsx
        
    }

  return (
    <authContext.Provider value={values}>{children}</authContext.Provider>
  )
}

export default AuthContext