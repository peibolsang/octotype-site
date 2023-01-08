import React, { useState, useEffect } from 'react';

interface InputCursorProps {
  text: string;
}

const InputCursor: React.FC<InputCursorProps> = ({ text }) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prevShowCursor => !prevShowCursor);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative">
      {text}
      {showCursor && (
        <span className="text-black-600 animate-blink cursor-pointer absolute">|</span>
      )}
    </span>
  );
};

export default InputCursor;
