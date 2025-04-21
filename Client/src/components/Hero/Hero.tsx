import React from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll
import hand_icon from "../../assets/hand_icon.png";
import main_img from "../../assets/mainimg.jpg";

const Hero = () => {
  return (
    <div>
      <section className="px-3 py-2 bg-neutral-100 lg:py-10">
        <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
          <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
            <div className="flex flex-row gap-6 justify-center items-center">
              <p className="text-4xl font-bold md:text-7xl text-orange-600">
                25% OFF
              </p>
              <img src={hand_icon} alt="" className="w-12 h-12" />
            </div>
            <p className="text-4xl font-bold md:text-7xl">WINTER SALE</p>
            <p className="mt-2 text-sm md:text-lg">For limited time only!</p>

            {/* Add scroll functionality here */}
            <Link
              to="homeSection" // Target the "Home" section
              smooth={true}
              duration={500}
            >
              <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                Shop Now
              </button>
            </Link>
          </div>
          <div className="order-1 lg:order-2">
            <img
              className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]"
              src={main_img}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
