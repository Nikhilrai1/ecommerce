import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router';
import '../styles/globals.css';
import LoadingBar from 'react-top-loading-bar'



function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [userToken, setUserToken] = useState({ value: null });
  const [key, setKey] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const loadingRef = useRef(null);
  // geting cart data for one time only
  useEffect(() => {
    router.events.on('routerChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routerChangeComplete', () => {
      setProgress(100);
    })
    try {
      if (localStorage.getItem("cart")) {
        let cartItem = JSON.parse(localStorage.getItem("cart"));
        setCart(cartItem);
        saveCart(cartItem);
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken({ value: token });
      setKey(Math.random);
      console.log(token)
    }
  }, [router.query])

  // savecart
  const saveCart = (newCart) => {

    if (newCart !== {}) {
      let totalPrice = 0;
      let keys = Object.keys(cart);
      for (let i = 0; i < keys.length; i++) {
        totalPrice += newCart[keys[i]].price * newCart[keys[i]].qty;
      }
      setSubTotal(totalPrice);
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  // addToCart
  const addToCart = (name, itemCode, size, variant, qty, price) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, size, name, variant, price };
    }
    setCart(newCart);
    saveCart(newCart);
  }

  // remove cart
  const removeCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  }

  // clearCart
  const clearCart = () => {
    setCart({});
    saveCart({});
  }
  const buyNow = (name, itemCode, size, variant, qty, price) => {
    let newCart = { itemCode: { qty: 1, size, name, variant, price } };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  }

  const logout = () => {
    localStorage.removeItem("token");
    setKey(Math.random());
    setUserToken({ value: null });
    router.push("/")
  }
  return (
    <>
      <LoadingBar color='#F44336' height={3} ref={loadingRef} />
      {key && <Navbar key={key} logout={logout} user={userToken} cart={cart} clearCart={clearCart} addToCart={addToCart} removeCart={removeCart} saveCart={saveCart} subTotal={subTotal} />}
      <Component buyNow={buyNow} cart={cart} clearCart={clearCart} addToCart={addToCart} removeCart={removeCart} saveCart={saveCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
