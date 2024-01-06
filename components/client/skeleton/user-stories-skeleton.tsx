import Container from "@/components/ui/container"
import Section from "@/components/ui/section"
import { CMS_NAME } from "@/lib/constants"
import { PostPreviewSkeleton } from "./post-preview-skeleton"
import {Carousel, CarouselContent, CarouselItem, ResponsiveCarouselButtons} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress";
import { DoubleArrowRightIcon, DoubleArrowLeftIcon } from "@radix-ui/react-icons";


interface Props {
    username: string
  }

  const UserStoriesSkeleton: React.FC<Props> = ({ username }) => {
    return(
      <>
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
          <Section title="Pinned stories">
            <div className="gap-[16px]">
            <div className="flex items-center justify-center">
        <div>
          <div className="flex flex-col items-center justify-center">
              <Progress className="w-32 mb-4 bg-stone-300 bg-opacity-30 h-[6px]" value={0} indicatorColor="bg-stone-200"/>
              <div className="text-sm flex items-center justify-center block md:hidden lg:hidden">
                {
                  <>
                      <DoubleArrowLeftIcon className="mr-1"/>
                      {0}/{0}
                      <DoubleArrowRightIcon className="ml-1"/>
                  </>
                }
              </div>
          </div>
            <Carousel
                        opts={{
                        align: "center",
                        }}
                    className="w-screen md:max-w-xl lg:max-w-4xl"
                >
                    <CarouselContent>
                            <CarouselItem key={1} className="w-full basis-1/1">
                              <PostPreviewSkeleton/>
                            </CarouselItem>
                    </CarouselContent>
                    <ResponsiveCarouselButtons className="dark:hover:bg-slate-400 dark:hover:text-black" />
                </Carousel>
              </div>
              </div>
            </div>
          </Section>
        </Container>
      </section>
      <Container>
        <Section title={`All stories`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <PostPreviewSkeleton/>
            <PostPreviewSkeleton/>
          </div>
        </Section>
      </Container>
        </>
    )
  }

  export {UserStoriesSkeleton};