import Section from "@/components/ui/section";
import {Card} from "@/components/ui/card";
import Container from "@/components/ui/container";
import React from "react";
import Code from "@/components/ui/code";
import { CheckCircledIcon } from "@radix-ui/react-icons";

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
            <Card key={key} className={showUserProgress && value.title==="Step 1"? `bg-[#9aae8e] dark:bg-green-700 dark:bg-[#818CF8]`:``}>
              <div
                className="flex flex-row lg:flex-col gap-[16px] p-[24px] h-full items-center lg:items-start"
              >
                <div className={showUserProgress && value.title==="Step 1"? `md:text-1xl lg:text-[1.25rem] font-bold text-white dark:text-white min-w-max` : `md:text-1xl lg:text-[1.25rem] font-bold text-gray-800 dark:text-white min-w-max` }>
                  {
                  showUserProgress && value.title==="Step 1"? 
                    <>
                      <div className="flex flex-row">
                        {value.title}
                        <CheckCircledIcon className="ml-2 mt-1 size-5"/>
                      </div>
                    </>
                    :
                    value.title
                  }
                </div>
                <div className={showUserProgress && value.title==="Step 1"? `dark:text-white md:text-1xl font-medium text-white leading-7`: `dark:text-white md:text-1xl font-medium text-slate-600 leading-7`}>
                  {showUserProgress && value.title==="Step 1"? 
                    <>
                      <Code>octotype</Code> repo already created
                    </>:value.content(username)}
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