import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none">
      {children}
    </h1>
  );
};

export default PostTitle;
