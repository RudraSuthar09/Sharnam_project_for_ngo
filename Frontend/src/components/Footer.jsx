import React from "react";

const Footer = () => {
  return (
    <div className="main5 flex items-center justify-center p-8 bg-blue-200">
      <footer className="w-full flex justify-between items-center bg-blue-600 text-white p-8 rounded-lg shadow-lg">
        <div className="quote text-2xl italic font-bold w-2/5">
          &ldquo; The greatness of a nation and its moral progress can be judged by the way its animals are treated.&rdquo;
        </div>
        <div className="list1 text-lg underline w-1/4">
          <h3>Contact Details</h3>
        </div>
        <div className="list2 text-lg underline w-1/4">
          <h3>Donate</h3>
        </div>
      </footer>
    </div>
  );
};

export default Footer;