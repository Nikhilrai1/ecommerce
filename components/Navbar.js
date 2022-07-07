import React, { useRef, useState } from 'react';
import Image from "next/Image";
import Link from "next/Link";
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';



const Navbar = ({ user, logout, cart, addToCart, removeCart, clearCart, subTotal }) => {
    const ref = useRef();
    const [dropDown, setDropDown] = useState(false)
    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        }
        else if (ref.current.classList.contains("translate-x-0")) {
            ref.current.classList.remove("translate-x-0");
            ref.current.classList.add("translate-x-full");
        }
    }
    const handleCartBar = () => isOpen ? setIsOpen(false) : setIsOpen(true);
    return (
        <div className='flex z-10 w-full flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
            <div className="logo mr-auto md:mx-5">
                <Link href={"/"}><a><Image src="/logo.webp" alt="logo" height={40} width={200} /></a></Link>
            </div>
            <div className="nav">
                <ul className='flex items-center space-x-4 md:text-md font-bold'>
                    <Link href={"/tshirts"}><a><li className='hover:text-pink-600'>T-Shirts</li></a></Link>
                    <Link href={"/hoodies"}><a><li className='hover:text-pink-600'>Hoodies</li></a></Link>
                    <Link href={"/mugs"}><a><li className='hover:text-pink-600'>Mugs</li></a></Link>
                    <Link href={"/stickers"}><a><li className='hover:text-pink-600'>Stickers</li></a></Link>
                </ul>
            </div>
            <div className="cart flex absolute right-0 top-4 mx-5">
                {dropDown &&
                    <div onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className="border shadow-lg  absolute right-8 bg-white top-6 rounded-md w-32">
                        <ul className='flex justify-center items-center flex-col'>
                            <Link href={"/myaccount"}><li className="py-1 hover:text-pink-600 text-sm">My Account</li></Link>
                            <Link href={"/orders"}><li className="py-1 hover:text-pink-600 text-sm">Orders</li></Link>
                            <li onClick={logout} className="py-1 hover:text-pink-600 text-sm">Logout</li>
                        </ul>
                    </div>
                }
                {user.value && <MdAccountCircle onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className=' md:text-3xl cursor-pointer mx-2' />}
                {!user.value && <Link href={"/login"}>
                    <button className='cursor-pointer px-2 py-1 rounded:md bg-pink-500 text-sm text-white mx-2 '>Login</button>
                </Link>}
                <AiOutlineShoppingCart onClick={toggleCart} className=' md:text-3xl cursor-pointer' />
            </div>
            <div style={{ zIndex: 100 }} ref={ref} className="sidebar  z-100 h-full top-0 right-0 fixed transform translate-x-full transition-transform bg-pink-100 px-8 w-72 py-10">
                <h1 className="text-xl font-bold text-center">Shopping Cart</h1>
                <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
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
                <span className="my-4">SubTotal ${subTotal}</span>
                <div className="flex justify-between">
                    <Link href={"/checkout"}>
                        <button class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">
                            <BsFillBagCheckFill className='m-1' />Checkout
                        </button>
                    </Link>
                    <button onClick={clearCart} class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">
                        <BsFillBagCheckFill className='m-1' />Clear Cart
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Navbar