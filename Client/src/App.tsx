import "./App.css";
import Banner from "./components/Banner/Banner";
import CarouselWithDelay from "./components/CarouselPlugin/Carousel";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
export const BASE_URL = `http://localhost:3000`;
function App() {
  return (
    <>
      <Navbar />
      {/* <CarouselWithDelay /> */}
      <Hero />
      <Home />
      <Banner />
      <Footer/>
    </>
  );
}

export default App;
