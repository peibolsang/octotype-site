'use client'
import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    ResponsiveCarouselButtons,
    CarouselApi
  } from "@/components/ui/carousel"
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { PostGridSkeleton } from "@/components/client/skeleton/post-grid-skeleton";
import { DoubleArrowRightIcon, DoubleArrowLeftIcon } from "@radix-ui/react-icons";

const AllStoriesSkeleton = () => {

  const [api, setApi] = useState<CarouselApi>()
  const [progress, setProgress] = useState(0)
  const [numberOfCards, setNumberOfCards] = useState(0)
  const [currentCard, setCurrentCard] = useState(1)

  useEffect(() => {
    if (!api) {
      return;
    }
   
    setNumberOfCards(api.slideNodes().length)

    const handleSelect = (api: CarouselApi) => {
      const slideProgress = Math.round(((api.selectedScrollSnap())/(api.slideNodes().length-1)) * 100)
      setCurrentCard(api.selectedScrollSnap()+1)
      setProgress(slideProgress);
    };
  
    api.on("select", handleSelect);
  
    // Cleanup function
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);
    
    return (
        <>
        <Container>
          <Section
            title="Latest stories"
            description="Catch up with good ideas from the development community">
            <div className="flex items-center justify-center">
              <div>
                <div className="flex flex-col items-center justify-center">
                    <Progress className="w-32 mb-4 bg-stone-300 bg-opacity-30 h-[6px]" value={progress} indicatorColor="bg-stone-200"/>
                    <div className="text-sm flex items-center justify-center block md:hidden lg:hidden">
                      {
                        <>
                            <DoubleArrowLeftIcon className={currentCard>1? `visible mr-1`:`invisible mr-1`}/>
                            {currentCard}/{numberOfCards}
                            <DoubleArrowRightIcon className="ml-1"/>
                        </>
                      }
                    </div>
                </div>
                <Carousel
                    setApi={setApi}
                        opts={{
                        align: "center",
                        }}
                    className="w-screen md:max-w-xl lg:max-w-4xl"
                >
                    <CarouselContent>
                            <CarouselItem key={1} className="w-full basis-1/1 md:basis-1/2 lg:basis-1/2">
                              <PostGridSkeleton/>
                            </CarouselItem>
                            <CarouselItem key={2} className="w-full basis-1/1 md:basis-1/2 lg:basis-1/2">
                              <PostGridSkeleton/>
                            </CarouselItem>
                    </CarouselContent>
                    <ResponsiveCarouselButtons className="dark:hover:bg-slate-400 dark:hover:text-black" />
                </Carousel>
                </div>
                </div>
              </Section>
            </Container>
            </>
      );
}

export {AllStoriesSkeleton};