import React, { useEffect, useState } from "react";
import Tray from 'assets/images/tray.png'
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-12 right-3 cursor-pointer ">
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed animate-bounce p-2 rounded-lg  bottom-12 right-3 lg:bottom-24 lg:right-5 cursor-pointer"
        >
          <img src={Tray} style={{height:"50px"}} alt="top"/>
        </div>
      )}
    </div>
  );
}