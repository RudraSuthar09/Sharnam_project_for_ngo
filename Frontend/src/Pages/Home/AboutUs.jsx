import React from "react";

const AboutUs = () => {
  return (
    <div className="main3 h-screen bg-purple-200 flex flex-col items-center justify-center p-8">
      <div className="heading flex flex-col items-center mb-8">
        <div className="title text-4xl font-bold">About Us</div>
        <div className="imgvector mt-4">
          {/* Placeholder for the image */}
          <img src="dog-8679005_1920.png" id="dogvector" className="w-1/2" alt="Dog Vector" />
        </div>
      </div>
      <div className="about_us flex flex-col items-center">
        <div className="text text-lg text-justify font-semibold mb-8">
          We are a dedicated non-profit organization committed to rescuing and rehabilitating injured animals and birds. Founded on a deep love for animals, our mission is to provide medical care, love, and a safe haven for these vulnerable creatures, ensuring they receive the best chance for recovery and a better life. Through community engagement, education, and compassionate care, we strive to make a positive impact on the lives of animals in need.
        </div>

        <div className="values flex gap-12">
          <ul className="flex flex-col gap-8">
            <li className="flex flex-col items-center bg-antiquewhite p-4 rounded-lg shadow-lg">
              <img src="compassion.png" alt="Compassion" id="valuesimg" className="w-1/3 h-1/3 rounded-full shadow-lg" />
              <span className="flex flex-col items-center mt-4">
                <h3 className="text-2xl font-bold">Compassion</h3>
                <p className="text-justify text-lg font-semibold text-gray-800 mt-2">
                  Compassion is the heart of our NGO's mission, guiding every step we take in rescuing and rehabilitating injured animals and birds. We strive to offer them not only medical care but also love and a safe space for healing and recovery.
                </p>
              </span>
            </li>
            <li className="flex flex-col items-center bg-antiquewhite p-4 rounded-lg shadow-lg">
              <img src="Integrity.jpg" alt="Integrity" id="valuesimg" className="w-1/3 h-1/3 rounded-full shadow-lg" />
              <span className="flex flex-col items-center mt-4">
                <h3 className="text-2xl font-bold">Integrity</h3>
                <p className="text-justify text-lg font-semibold text-gray-800 mt-2">
                  Integrity is the cornerstone of our NGO’s work, ensuring that every action we take in rescuing and rehabilitating injured animals and birds is rooted in honesty, transparency, and ethical care. We remain committed to upholding trust in all that we do.
                </p>
              </span>
            </li>
            <li className="flex flex-col items-center bg-antiquewhite p-4 rounded-lg shadow-lg">
              <img src="sustainibility.png" alt="Sustainability" id="valuesimg" className="w-1/3 h-1/3 rounded-full shadow-lg" />
              <span className="flex flex-col items-center mt-4">
                <h3 className="text-2xl font-bold">Sustainability</h3>
                <p className="text-justify text-lg font-semibold text-gray-800 mt-2">
                  Sustainability drives our efforts to create a lasting impact in the rescue and rehabilitation of injured animals and birds. By fostering eco-friendly practices and promoting long-term solutions, we aim to ensure a safe and thriving environment for both wildlife and future generations.
                </p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;