import React from 'react'
import hand_icon from "../../assets/hand_icon.png"

const Hero = () => {
  return (
    <div>
      <section className="px-3 py-2 bg-neutral-100 lg:py-10">
    <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
        <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <div className='flex flex-row  gap-6 justify-center items-center'>
            <p className="text-4xl font-bold md:text-7xl text-orange-600">25% OFF</p>    
              <img src={hand_icon} alt="" className='w-12 h-12' />
            </div>
            <p className="text-4xl font-bold md:text-7xl">WINTER SALE</p>
            <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
      
            <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">Shop Now</button>
        </div>
        <div className="order-1 lg:order-2">
            <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt=""/>
        </div>
    </div>
</section>
    </div>
  )
}

export default Hero
