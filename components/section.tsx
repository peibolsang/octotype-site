type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

const Section = ({ children, title, description }: Props) => {
  return (
    <div className="flex flex-col gap-[32px] py-[64px]">
      <div className="flex flex-col gap-[16px]">
        <h2 className="text-[1.5rem] xl:text-[2rem] font-bold">{title}</h2>
        {description && (
          <p className="text-[1.125rem] xl:text-[1.25rem] max-w-[56ch] text-slate-600 dark:text-slate-200">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default Section;
