import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  interactive?: boolean;
};

const Card = ({ children, interactive }: Props) => {
  return (
    <div
      className={`w-full border-2 border-slate-100 dark:bg-slate-900 dark:border-slate-700 rounded-xl transition-all overflow-x-hidden min-h-fit ${
        interactive
          ? "hover:bg-slate-50 dark:hover:bg-[#020617] hover:border-slate-300  dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-[#1e293b]  hover:ease-in duration-150"
          : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
