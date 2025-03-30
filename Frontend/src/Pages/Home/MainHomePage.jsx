import React, { useEffect } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import AboutUs from "../../components/AboutUs"; // Ensure AboutUs component is imported
import "./MainHomepage.css";  // Use CSS for styling

const MainHomePage = () => {
  useEffect(() => {
    const slides = document.querySelectorAll(".box");
    let counter = 0;

    slides.forEach((slide, index) => {
      slide.style.left = `${index * 50}%`;
    });

    const goPrev = () => {
      counter--;
      slideBox();
    };

    const goNext = () => {
      counter++;
      slideBox();
    };

    const slideBox = () => {
      slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
      });
    };

    window.goPrev = goPrev; // Make goPrev accessible globally
    window.goNext = goNext; // Make goNext accessible globally
  }, []);

  return (
    <>
      <MainNavbar />
      <div className="main1 flex flex-col items-center justify-center h-screen bg-cover bg-center bg-yellow-500 py-10">
        <h1 className="text-white text-6xl font-serif font-light text-center shadow-lg">WELCOME TO SHARANAM</h1>
        <h2 className="text-white text-3xl font-yatra mt-4 shadow-lg">आश्रयः सर्वेषाम्</h2>
      </div>

      <div className="main2 h-screen bg-antiquewhite"></div>

      <div className="main4 flex justify-evenly items-center h-screen bg-yellow-400 relative">
        <div className="boxes grid grid-flow-col auto-cols-fr gap-10 overflow-hidden w-full mx-auto bg-yellow-400 p-4 rounded-lg shadow-lg">
          <div className="box bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="box_img bg-gray-200 w-full h-64"></div>
            <h3 className="text-2xl pt-4">Fresh & Clean: Dog Bathing</h3>
            <p className="text-lg text-gray-700 py-2">
              Give your furry friend the ultimate care they deserve. Join Sharnam in promoting healthy habits by donating or volunteering. Every bit helps our four-legged pals!
            </p>
            <div className="Read_More text-left pt-4">
              <a href="#" className="text-blue-500">Read More</a>
            </div>
          </div>

          <div className="box bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="box_img bg-gray-200 w-full h-64"></div>
            <h3 className="text-2xl pt-4">Nourish Our Cats!</h3>
            <p className="text-lg text-gray-700 py-2">
              Keep our feline friends happy and healthy with nutritious meals. Every meal makes a difference in their well-being. Join us in providing the best care for our cats. Make every kitty smile!
            </p>
            <div className="Read_More text-left pt-4">
              <a href="#" className="text-blue-500">Read More</a>
            </div>
          </div>

          <div className="box bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="box_img bg-gray-200 w-full h-64"></div>
            <h3 className="text-2xl pt-4">Cherish Our Cows!</h3>
            <p className="text-lg text-gray-700 py-2">
              Nurture these gentle giants with acts of kindness and care. Ensure they thrive and flourish with our efforts. Stand tall for our beloved cows and make a lasting impact!
            </p>
            <div className="Read_More text-left pt-4">
              <a href="#" className="text-blue-500">Read More</a>
            </div>
          </div>

          <div className="box bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="box_img bg-gray-200 w-full h-64"></div>
            <h3 className="text-2xl pt-4">Save Birds!</h3>
            <p className="text-lg text-gray-700 py-2">
              Our feathered friends need your help. Every action counts towards protecting their habitats and ensuring their survival. Join the mission and make a difference for our winged companions. Fly high with us in this cause!
            </p>
            <div className="Read_More text-left pt-4">
              <a href="#" className="text-blue-500">Read More</a>
            </div>
          </div>

          <div className="box bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="box_img bg-gray-200 w-full h-64"></div>
            <h3 className="text-2xl pt-4">Care for Elephants!</h3>
            <p className="text-lg text-gray-700 py-2">
              These majestic giants need your love and protection. Every gesture ensures their well-being and preserves their grandeur. Stand tall with us and make a real difference for our elephants!
            </p>
            <div className="Read_More text-left pt-4">
              <a href="#" className="text-blue-500">Read More</a>
            </div>
          </div>
        </div>

        <button className="left-btn absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => window.goPrev()}>
          <img src="left-arrow.png" alt="Previous" className="h-15 w-auto" />
        </button>
        <button className="right-btn absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => window.goNext()}>
          <img src="right-arrow.png" alt="Next" className="h-15 w-auto" />
        </button>
      </div>

      <AboutUs/>
      <Footer />
    </>
  );
};

export default MainHomePage;