import { useState, useEffect } from "react";

const Carousel = ({ children, activeIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [windowWidth, setWindowWidth] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      handleResize(); // Initial window width
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % children.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + children.length) % children.length);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      handleNext();
    }

    if (diff < -5) {
      handlePrev();
    }

    setTouchPosition(null);
  };

  const renderCarouselChildren = () => {
    if (windowWidth < 1024) {
      return children[currentIndex];
    }

    return (
      <>
        {children[currentIndex]}
        {children[(currentIndex + 1) % children.length]}
      </>
    );
  };

  return (
    <>
      <div className="flex items-center lg:mx-[-48px]">
        <div className="hidden lg:block">
          <button
            className="rounded-full h-8 w-8 dark:bg-white bg-black hover:bg-[#818CF8] flex items-center justify-center"
            onClick={handlePrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white dark:text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="grid items-center grid-cols-1 lg:grid-cols-2 justify-center w-full lg:px-4 gap-4 content-stretch"
        >
          {renderCarouselChildren()}
        </div>
        <div className="hidden lg:block">
          <button
            className="rounded-full h-8 w-8 dark:bg-white bg-black hover:bg-[#818CF8] flex items-center justify-center"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white dark:text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center lg:mt-0 mt-5 gap-x-2">
        <div className="rounded-full lg:h-0 lg:w-0 h-3 w-3 dark:bg-white bg-black"></div>
        <div className="rounded-full lg:h-0 lg:w-0 h-3 w-3 dark:bg-white bg-black"></div>
      </div>
    </>
  );
};

export default Carousel;
