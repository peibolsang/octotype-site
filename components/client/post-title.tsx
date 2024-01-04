import { ReactNode } from "react";
import { Playfair_Display } from 'next/font/google';

const googleFont = Playfair_Display({
  weight: '400',
  subsets: ['latin'] // Add this line
});

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className={`${googleFont.className} text-center md:text-left lg:text-left text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-4`}>
      {children}
    </h1>
  );
};

export default PostTitle;
