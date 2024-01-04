type Props = {
  children?: React.ReactNode;
};

const Code = ({ children }: Props) => {
  return (
    <mark className="dark:text-slate-200 bg-slate-200 dark:bg-slate-700 text-slate-600 font-normal py-1 px-2 rounded-[4px] font-mono">
      {children}
    </mark>
  );
};

export default Code;
