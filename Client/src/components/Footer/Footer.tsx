import React from "react";
import { Link } from "react-router-dom"; // Correct Link
import { Icon } from "@iconify/react"; // Import Icon
import logo from '../../assets/logo11.png'; // Assume you have an image in assets
import esewa from "../../assets/esewa.png";
import khalti from "../../assets/khalti.png";
// import esewa from "../assets/esewa.png";
// import khalti from "../assets/khalti.png";

// Using img tag instead of Next.js Image component
const Footer = () => {
  return (
    <div>
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-8 ">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-3 space-y-4 ">
              <Link to="/" className="flex items-center justify-center">
                <img src={logo} alt="MERNIFY Logo" className="w-28 h-auto" />
              </Link>
              <p className="text-sm text-gray-600">
                Fresh vegetables, fruits and groceries delivered to your
                doorstep.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Icon icon="mdi:facebook" className="w-7 h-7" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Icon icon="mdi:instagram" className="w-7 h-7" />
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <Icon icon="mdi:twitter" className="w-7 h-7" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 text-[22px]">
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/collection"
                    className="text-gray-600 hover:text-primary"
                  >
                Mens
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collection"
                    className="text-gray-600 hover:text-primary"
                  >
                    Womens
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collection"
                    className="text-gray-600 hover:text-primary"
                  >
                    Kids
                  </Link>
                </li>
               
              </ul>
            </div>

            {/* Customer Service */}
            <div className="md:col-span-2 text-[22px]">
              <h3 className="font-medium mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/help" className="text-gray-600 hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders/track"
                    className="text-gray-600 hover:text-primary"
                  >
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-gray-600 hover:text-primary"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="md:col-span-2 text-[22px]">
              <h3 className="font-medium mb-4">Information</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-600 hover:text-primary"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-primary">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3 text-[22px]">
              <h3 className="font-medium mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-3">
                Subscribe to get updates on new products and offers.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="text-sm rounded-md border px-2 py-1"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Payment & App */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <p className="text-sm text-gray-500 mr-4">Payment Methods:</p>
              <div className="flex space-x-3">
                <img src={esewa} alt="esewa" className="w-24 h-auto" />
                <img src={khalti} alt="khalti" className="w-24 h-auto" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Get Our App:</span>
              <a
                href="#"
                className="flex items-center gap-1 text-xs bg-black text-white px-3 py-1.5 rounded"
              >
                <Icon icon="mdi:apple" className="w-4 h-4" />
                <span>App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-xs bg-black text-white px-3 py-1.5 rounded"
              >
                <Icon icon="mdi:google-play" className="w-4 h-4" />
                <span>Play Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} MERNify. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link
                to="/sitemap"
                className="text-xs text-gray-500 hover:text-primary"
              >
                Sitemap
              </Link>
              <Link
                to="/accessibility"
                className="text-xs text-gray-500 hover:text-primary"
              >
                Accessibility
              </Link>
              <Link
                to="/cookies"
                className="text-xs text-gray-500 hover:text-primary"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
