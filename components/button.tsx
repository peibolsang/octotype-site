import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  onClick?: <MouseEvent>(event: MouseEvent) => void;
};

const Button = ({ label, href, onClick }: Props) => {
  return (
    <button
      className="inline-flex w-fit items-center dark:bg-white dark:hover:bg-[#818CF8] dark:text-black dark:hover:text-white bg-slate-900 hover:bg-[#818CF8] text-white font-bold py-2 px-4 rounded-full h-[44px] hover:easy-in duration-150 cursor-pointer"
      onClick={href ? () => (window.location.href = href) : onClick}
    >
      {label}
    </button>
  );
};

export default Button;
