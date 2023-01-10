import { useState } from 'react'

const Carousel = ({ children, activeIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex)

  const handleNext = () => {
    setCurrentIndex(currentIndex < children.length - 1 ? currentIndex + 1 : 0)
  }

  const handlePrev = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : children.length - 1)
  }

  const [touchPosition, setTouchPosition] = useState(null)

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if(touchDown === null) {
        return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
        handleNext()
    }

    if (diff < -5) {
        handlePrev()
    }

    setTouchPosition(null)
  }
  
  return (
    <>
    <div className="flex items-center">
      <div className="hidden md:block">
        <button
          className="rounded-full h-8 w-8 dark:bg-white bg-black hover:bg-[#818CF8] flex items-center justify-center"
          onClick={handlePrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} className="flex items-center justify-center w-full">
        {children[currentIndex]}
      </div>
      <div className="hidden md:block">
        <button
          className="rounded-full h-8 w-8 dark:bg-white bg-black hover:bg-[#818CF8] flex items-center justify-center"
          onClick={handleNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white dark:text-black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
    <div className="flex items-center justify-center md:mt-0 mt-5 gap-x-2">
      <div className="rounded-full md:h-0 md:w-0 h-3 w-3 dark:bg-white bg-black"></div>
      <div className="rounded-full md:h-0 md-w-0 h-3 w-3 dark:bg-white bg-black"></div>
    </div>
    </>
  )
}

export default Carousel
