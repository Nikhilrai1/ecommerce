import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Head from "next/head";
import Script from "next/script";


const Checkout = ({ cart, addToCart, removeCart, subTotal }) => {

  const initiatePayment = async () => {

    // Get a transaction token
    let oid =  Math.floor(Math.random() * Date.now());
    let data = {cart,subTotal,oid,email: "nikhilrai@gmail.com"};
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let txnRes = await res.json();
    console.log(txnRes)
    let txnToken = txnRes.txnToken;
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subtotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    // initialze configuration using init method 
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });

  }
  return (
    <div style={{ marginTop: "80px" }}>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PAYTM_PAYTM_MID}.js`} onload="onScriptLoad();"> </Script>
      <h1 className='sm:text-3xl text-2xl  title-font text-center'>CheckOut</h1>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className=" font-bold mb-4 text-gray-900">Details</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                  <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="Address" className="leading-7 text-sm text-gray-600">Address</label>
                  <textarea id="Address" name="Address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                  <input type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                  <input type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                  <input type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
                  <input type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <h2 className='my-7 font-bold text-gray-900'>2.Reviews Cart Items & Pays</h2>
              <div className="bg-pink-100 px-8 py-7 w-full">
                <ul className='flex flex-col list-decimal'>
                  {Object.keys(cart).length === 0 && <div className='my-4 font-bold mx-auto'>Your Cart is ! Empty.</div>}
                  {
                    Object.keys(cart).map((k) => {
                      return (
                        <li className='w-full my-5' key={k}>
                          <div className="item flex w-full">
                            <div className='w-2/3 font-semibold'>{cart[k].name}</div>
                            <div className='w-1/3 font-semibold flex  items-center justify-between text-lg '>
                              <AiFillMinusCircle onClick={() => removeCart(k, 1)} className='text-pink-500 cursor' />
                              <span className="mx-3 flex text-sm">{cart[k].qty}</span>
                              <AiFillPlusCircle onClick={() => addToCart(cart[k].name, k, cart[k].size, cart[k].variant, 1, cart[k].price)} className='text-pink-500 cursor' />
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
                <span className="subtotal font-bold text-3xl">SubTotal: {subTotal}</span>
              </div>
              <div className="my-4 p-2 w-full">
                <button onClick={initiatePayment} className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Pay ${subTotal}</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Checkout