'use client'
import React, { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
};

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [typedText, setTypedText] = useState("");

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

  return (
    <span>
      <mark className="bg-[#9aae8e] dark:bg-[#818CF8] dark:text-[#818CF8] bg-opacity-20 dark:bg-opacity-20 pl-1 pr-1 text-[#9aae8e] dark:text-[#818CF8]">
        {typedText}
      </mark>
    </span>
  );
};

export default Typewriter;
