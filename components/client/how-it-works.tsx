import Section from "@/components/ui/section";
import {Card} from "@/components/ui/card";
import Container from "@/components/ui/container";
import React from "react";
import Code from "@/components/ui/code";

const steps = new Map([
    [
      "Step 1",
      {
        title: "Step 1",
        content: (username: string) =>(
          <React.Fragment>
            Create a GitHub repo <Code>{username}/octotype</Code>
          </React.Fragment>
        ),
      },
    ],
    [
      "Step 2",
      {
        title: "Step 2",
        content: (username: string) => (
          <React.Fragment>
            Create an issue and apply the <Code>published</Code> label
          </React.Fragment>
        ),
      },
    ],
    [
      "Step 3",
      {
        title: "Step 3",
        content: (username: string) => (
          <React.Fragment>
            Share your story from <Code>octotype.app/{username}</Code>
          </React.Fragment>
        ),
      },
    ],
  ]);

  interface Props {
    username: string
    showUserProgress: boolean
  }

  const HowItWorks: React.FC<Props> = ({ username, showUserProgress }) => {
    return(
      <Container>
      <Section
        title="How it works?"
        description="Octotype streamlines the process of publishing, allowing authors to go
            from idea to publication in just three steps."
      >
        <div className="flex flex-col lg:flex-row gap-[16px]">
          {Array.from(steps, ([key, value]) => (
            <Card key={key} className={showUserProgress && value.title==="Step 1"? `bg-green-200 dark:bg-green-700`:``}>
              <div
                className="flex flex-row lg:flex-col gap-[16px] p-[24px] h-full items-center lg:items-start"
              >
                <div className="md:text-1xl lg:text-[1.25rem] font-bold text-gray-800 dark:text-white min-w-max">
                  {value.title}
                </div>
                <div className="dark:text-white md:text-1xl font-medium text-slate-600 leading-7">
                  {value.content(username)}{" "}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </Container>
    )
  }

  export {HowItWorks}