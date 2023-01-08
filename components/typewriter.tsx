import React, { useEffect, useState } from 'react';

const Typewriter = ({ text }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, 100);
  }, [text]);

  return <span>{typedText}</span>;
};

export default Typewriter;
