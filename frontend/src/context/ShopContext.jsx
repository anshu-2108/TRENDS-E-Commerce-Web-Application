import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const ShopContext=createContext()

const ShopContextProvider=(props)=>{

    const currency='$';
    const delivery_fee=40;
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems,setCartItems]=useState({})
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate()

    const addtocart=async(itemId,size)=>{
        if (!size) {
            toast.error('Select product size')
            return
        }
        let cartData=structuredClone(cartItems)
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size]=1
            }
        }
        else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        setCartItems(cartData)
        
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getcartcount = () => {
        let total=0
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item]>0) {
                        total += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return total
    }

    const updateQuantity=async(ItemId,size,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[ItemId][size]=quantity
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update',{ItemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getcartamount=()=>{
        let totalAmount=0
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items)
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item]>0) {
                        totalAmount+=itemInfo.price*cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }

    const getProductsData = async() => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getusercart=async(token)=>{
        try {
            const response=await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getusercart(localStorage.getItem('token'))
        }
    },[])

    const value={
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addtocart,setCartItems,
        getcartcount,updateQuantity,getcartamount, navigate, backendUrl, setToken, token
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;