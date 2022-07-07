import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
const myaccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState("");


  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem('token')
    if (!user) {
      router.push("/");
    }
    if (user) {
      setUser(user);
      setEmail(user.email);
    }
  }, [])
  const handleUserSubmit = async () => {
    let data = {
      token: user
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    let userData = await res.json();
    console.log(userData)
  }

  // const handleChange = (e) => {
  //   if (e.target.name = "name") {
  //     setName(e.target.value)
  //   }
  //   if (e.target.name = "email") {
  //     setEmail(e.target.value)
  //   }
  //   if (e.target.name = "phone") {
  //     phone(e.target.value)
  //   }
  //   if (e.target.name = "address") {
  //     setAddress(e.target.value)
  //   }
  //   if (e.target.name = "pincode") {
  //     setPincode(e.target.value)
  //   }
  // }
  return (
    <div>
      <h1>Update Your Account</h1>
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
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">password</label>
                  <input type="text" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative">
                  <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">cpassword</label>
                  <input type="text" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
              <div className="my-4 p-2 w-full">
                <button onClick={handleUserSubmit} className="text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">submit</button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default myaccount