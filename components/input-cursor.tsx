import React, { useState, useEffect } from 'react';
import { text } from 'stream/consumers';
import Typewriter from './typewriter';

interface InputCursorProps {
  textarray: Array<string>;
}

const InputCursor: React.FC<InputCursorProps> = ({ textarray }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prevShowCursor => !prevShowCursor);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const [arrayIndex, setArrayIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(textarray[textarray.length-1])

  useEffect(() => {
     setTimeout(() => {
      setCurrentValue(textarray[arrayIndex])
      const nextIndex = (arrayIndex + 1)
      setArrayIndex(nextIndex === textarray.length ? 0 : nextIndex)
    }, 5000);

    return 
  }, [currentValue]);


  return (
    <span className="inline-block relative">
        <Typewriter text={currentValue}/>
        {showCursor && (
          <span className="dark:text-gray-300 text-[#818CF8] animate-blink cursor-pointer absolute">|</span>
        )}
    </span>
  );
};

export default InputCursor;
