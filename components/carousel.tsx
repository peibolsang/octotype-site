import { useState } from 'react'

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex(activeIndex < children.length - 1 ? activeIndex + 1 : 0)
  }

  const handlePrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : children.length - 1)
  }

  return (
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
      <div className="flex items-center justify-center w-full">
        {children[activeIndex]}
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
  )
}

export default Carousel
