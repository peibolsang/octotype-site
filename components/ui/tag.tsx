type Props = {
  children: any;
  bordered?: boolean;
};

const Tag = ({ children, bordered }: Props) => {
  return (
    <>
      {bordered ? (
        <div className="inline-flex items-center gap-2 w-fit py-1 px-2 border-2 border-slate-300 dark:border-slate-600 rounded-xl text-[0.875rem] font-medium font-mono">
          {children}
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-[0.875rem] font-medium font-mono">
          {children}
        </div>
      )}
    </>
  );
};

export default Tag;
