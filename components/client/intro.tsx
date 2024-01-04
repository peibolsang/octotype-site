import { CMS_NAME } from "@/lib/constants";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import React from "react";

type Props = {
  username: string;
  featuredPost: React.ReactNode;
};

const Intro = ({ username, featuredPost }: Props) => {
  return (
    <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[16px] xl:py-[32px]">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-baseline gap-[16px]">
          <h1 className="text-3xl md:text-7xl font-bold tracking-tighter leading-tight">
            {username}.
          </h1>
          <h4 className="text-center md:text-left text-lg">
            A tech blog using {CMS_NAME} as CMS
          </h4>
        </div>
        <Section>
          <div className="flex flex-col lg:flex-row gap-[16px] w-full">
            {featuredPost}
          </div>
        </Section>
      </Container>
    </section>
  );
};

export default Intro;