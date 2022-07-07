import React from 'react';
import Link from "next/Link";
import mongoose from 'mongoose';
import Product from '../models/Product';


const Hoodies = ({ hoodies }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {Object.keys(hoodies).length == 0 && <span className='mx-auto'>Sorry all hoodies are out of stocks. New Stocks are comming soon</span>}
            {
              Object.keys(hoodies).map((item) => {
                return (
                  <Link key={item._id} href={`/product/${hoodies[item].slug}`}><div className="cursor-pointer shadow-md lg:w-1/4 md:w-1/2 p-4 w-full">
                    <a className="block relative  rounded overflow-hidden">
                      <img alt="ecommerce" className="h-[30vh] m-auto md:h-[36vh] block" src={hoodies[item].img} />
                    </a>
                    <div className="mt-4 text-center">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{hoodies[item].category}</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{hoodies[item].title}</h2>
                      <p className="mt-1">${hoodies[item].price}</p>
                      <p className="mt-1 flex justify-center">
                        {hoodies[item].size.map((size) => {
                          return (
                            <span className='mx-2 border border-gray-300'>{size}</span>
                          )
                        })}
                      </p>
                      <p className="mt-1 flex justify-center">
                        {hoodies[item].color.map((color) => {
                          return (
                            <>
                            <button className={`border-2 border-gray-300 mx-2 bg-${color == 'black' ? 'black' : color + "-500"} rounded-full w-6 h-6 focus:outline-none`}></button>
                            </>
                          )
                        })}
                      </p>
                    </div>
                  </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hoodies
export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: 'hoodies'});
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color);
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size);
      }
    }
    else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { hoodies: JSON.parse(JSON.stringify(hoodies)) }
  }
}
