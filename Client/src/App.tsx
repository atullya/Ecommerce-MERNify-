import "./App.css";
import Banner from "./components/Banner/Banner";
import CarouselWithDelay from "./components/CarouselPlugin/Carousel";
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
    </>
  );
}

export default App;
