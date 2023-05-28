type Props = {
  children?: React.ReactNode;
  compact?: boolean;
};

const Container = ({ children, compact }: Props) => {
  return (
    <>
      {compact ? (
        <div className="xl:max-w-[800px] lg:max-w-[800px] max-w-none mx-[16px] xl:mx-auto lg:mx-auto md:mx-[32px]">
          {children}
        </div>
      ) : (
        <div className="xl:max-w-[1200px] lg:max-w-[800px] max-w-none mx-[16px] xl:mx-auto lg:mx-auto md:mx-[32px]">
          {children}
        </div>
      )}
    </>
  );
};

export default Container;
