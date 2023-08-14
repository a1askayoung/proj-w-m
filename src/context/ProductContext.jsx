import React from 'react'
import { createContext, useReducer } from "react";
import { ACTION_PRODUCTS, API_PRODUCTS } from '../helpers/consts';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export const productContext=createContext()                //! context #1

const INIT_STATE={                                    //! context #2
    products: [],                            // GET #2
    oneProduct: null,                       // detail #4
    productsTotalCount: 0,                                  //! PAGINATION #7
}                                               

const reducer=(state, action)=>{                             //! context #3
    switch (action.type) {
        case ACTION_PRODUCTS.GET_PRODUCTS:                  // GET #3  
            return {...state, products: action.payload.data,
            productsTotalCount: action.payload.headers['x-total-count']         //! PAGINATION #8
            }
        case ACTION_PRODUCTS.GET_ONE_PRODUCT:
            return {...state, oneProduct: action.payload}       // detail #5
        default:
            return state;
    }
}

export default function ProductContext({children}) {
    const [state, dispatch]= useReducer(reducer, INIT_STATE)        //! context #4      
    const location=useLocation()                                                      //? FILTRATION #1
    const navigate=useNavigate()                                                        //? FILTR

    async function getProducts(){                           
        try {                                                                         // GET #1
            let res=await axios(`${API_PRODUCTS}/${window.location.search}`);                        //! search #5 API 
            dispatch({
                type: ACTION_PRODUCTS.GET_PRODUCTS,
                payload: res,
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function createProduct(newProduct){
        try {   
            await axios.post(API_PRODUCTS, newProduct);             //? create #1
        } catch (error) {
            console.log(error);
        }
    }

    const getOneProduct=async(id)=>{
        try {
            let {data}=await axios(`${API_PRODUCTS}/${id}`)         // details #3
            let action={
                type: ACTION_PRODUCTS.GET_ONE_PRODUCT,
                payload: data,
            }
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct=async(newProduct)=>{
        try {
            await axios.patch(`${API_PRODUCTS}/${newProduct.id}`, newProduct)       // edit #3
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProduct=async(id)=>{
        try {
            await axios.delete(`${API_PRODUCTS}/${id}`)             // delete #1
            getProducts()
        } catch (error) {
            console.log(error);
        }
    }

    function fetchByParams(query, value){                                   //? query - key (category), value - all, iphone, plants...
                                    //? info from current address
        const  paramsFromUrl=new URLSearchParams(location.search)                          //? FILTRATION #2
        if (value==="all"){
            paramsFromUrl.delete(query)
        }
        else{
            paramsFromUrl.set(query, value)
        }         //? current address
        const url=`${location.pathname}?${paramsFromUrl.toString()}`       //? creating new address
        navigate(url)
    }

    const values={
        products: state.products,
        oneProduct: state.oneProduct,
        productsTotalCount: state.productsTotalCount,           //! PAGINATION #9, next is in productList 
        createProduct,  
        getProducts,                                     // GET #4
        getOneProduct,               
        editProduct,
        deleteProduct,
        fetchByParams,                                                          //? FILTRATION #3. next in FilterProduct
    }

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  )
}
