import { Button, FormControl, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ProductContext, { productContext, useProducts } from '../context/ProductContext'
import { Handyman } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const init={
    title: "",
    description: "",
    category: "",                           //? create #2
    price: "",
    picture: "",
}

export default function Form({isEdit}) {
    const {createProduct, editProduct, getOneProduct, oneProduct}=useContext(productContext);   
    const [product, setProduct]=useState(init)              //? create #3
    const {id}=useParams()                              // edit #4
    const navigate=useNavigate();       

    useEffect(()=>{
        if (isEdit) {
            getOneProduct(id)                   // edit #5
        }
    },[])

    useEffect(()=>{
        if(isEdit){
            setProduct(oneProduct);                 // edit #6
        }
    }, [oneProduct])

    function handleInp(e){
        if(e.target.name==="price"){
            let obj={
                ...product,
                [e.target.name]: Number(e.target.value),
            }
            setProduct(obj);
        }
        else{
            let obj={
                ...product,
                [e.target.name]: e.target.value,
            }
            setProduct(obj);
        }
        console.log(product);
    }

    function addProduct(){
        createProduct(product);
        setProduct(init);
    }

    function saveChanges(){
        editProduct(product);               // edit #7
        setProduct(init)
    }

  return (
    <FormControl sx={{gap: "20px", width: "100%", margin: "50px auto" }} color='success'>
        <TextField variant='outlined' placeholder='enter title' name='title' fullWidth type='text' value={product.title} onChange={handleInp}/>
        <TextField variant='outlined' placeholder='enter description' name='description' value={product.description} onChange={handleInp} fullWidth/>
        <TextField variant='outlined' placeholder='enter category' name='category' value={product.category} onChange={handleInp} fullWidth/> 
        <TextField variant='outlined' placeholder='enter price' name='price' value={product.price} onChange={handleInp} fullWidth/>
        <TextField variant='outlined' placeholder='enter picture' name='picture' value={product.picture} onChange={handleInp} fullWidth/>
        {/* edit #8 onClick */}
        {isEdit ? (
            <Button sx={{bgcolor: "#8c2cef", color: "#fff", '&:hover': {bgcolor: '#8125dc'},}} variant='outlined' fullWidth size='large' onClick={()=>{saveChanges(); navigate(-1)}}>Save changes</Button>
            ) : (
            <Button sx={{bgcolor: "#8c2cef", color: "#fff", '&:hover': {bgcolor: '#8125dc'},}} variant='outlined' fullWidth size='large' onClick={()=>addProduct()}>Add</Button>
        )}
    </FormControl>
    )
}
