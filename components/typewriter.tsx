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

  return <span><mark className="dark:bg-[#818CF8] dark:text-gray-300 bg-gray-100 pl-1 pr-1 text-[#818CF8]">{typedText}</mark></span>;
};

export default Typewriter;
