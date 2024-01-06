import Cursor from "@/components/ui/input-cursor";
import Container from "@/components/ui/container";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const MainIntro = () => {
  const textarray = ["developers.", "the world."];
  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between align-middle bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900  py-16 xl:py-32  md:py-24">
        <Container>
          <div className="flex flex-col gap-[32px] xl:gap-[40px] xl:pr-[33%]">
            <div className="flex flex-col gap-[16px]">
              <div className="inline-block h-48 md:h-52 xl:h-80 text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight">
                The content discovery platform from developers to{" "}
                <Cursor textarray={textarray} />
              </div>
              <p className="text-[1.25rem] xl:text-[1.5rem] font-regular">
                Octotype is a blogging platform for developers to easily
                create and publish stories using GitHub Issues as a CMS. Yes, it's that easy.
              </p>
            </div>

            <Button className="inline-flex w-fit items-center dark:bg-white hover:bg-[#9aae8e] dark:hover:bg-[#818CF8] dark:text-black dark:hover:text-white bg-slate-900 hover:bg-[#9aae8e] text-white font-bold py-2 px-4 rounded-full h-[44px] hover:easy-in duration-150 cursor-pointer">
              <Link href="https://repo.new">
                Tell Your Story
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MainIntro;