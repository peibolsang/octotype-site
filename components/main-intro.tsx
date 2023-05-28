import { useEffect } from "react";
import Cursor from "../components/input-cursor";
import MainHeader from "./main-header";
import Container from "./container";
import Button from "./button";

const MainIntro = () => {
  const textarray = ["developers", "the world"];
  return (
    <>
      <MainHeader />
      <section className="flex-col md:flex-row flex items-center md:justify-between align-middle  bg-slate-50 dark:bg-slate-900  py-16 xl:py-32  md:py-24">
        <Container>
          <div className="flex flex-col gap-[32px] xl:gap-[40px] xl:pr-[33%]">
            <div className="flex flex-col gap-[16px]">
              <div className="inline-block xl:h-auto text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight   ">
                The content discovery platform from Developers to{" "}
                <Cursor textarray={textarray} />
              </div>
              <p className="text-[1.25rem] xl:text-[1.5rem] font-regular">
                Octotype is a blog platform that allows developers to easily
                create and publish stories using GitHub Issues as a CMS.
              </p>
            </div>

            <Button label="Tell your story" href="https://repo.new"></Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default MainIntro;
