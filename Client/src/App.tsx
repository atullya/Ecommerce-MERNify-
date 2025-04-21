import "./App.css";
import Banner from "./components/Banner/Banner";
import CarouselWithDelay from "./components/CarouselPlugin/Carousel";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import NewsLetter from "./components/NewsLetter/NewsLetter";
import Home from "./pages/Home/Home";
export const BASE_URL = `http://localhost:3000`;
function App() {
  return (
    <>
      <Navbar />
      {/* <CarouselWithDelay /> */}
      <Hero />
      <Home />
      <ToastContainer />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default App;
