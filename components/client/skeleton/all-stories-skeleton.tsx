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
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "../../ui/skeleton";
import { PostPreviewSkeleton } from "./post-preview-skeleton";

const AllStoriesSkeleton = () => {

    const [api, setApi] = useState<CarouselApi>()
    const [progress, setProgress] = useState(0)
    const [numberOfCards, setNumberOfCards] = useState(0)

    useEffect(() => {
      if (!api) {
        return;
      }
     
      setNumberOfCards(api.slideNodes().length-1)
      const handleSelect = (api: CarouselApi) => {
        const slideProgress = Math.round(((api.selectedScrollSnap())/(api.slideNodes().length-1)) * 100)
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
                description="Catch up with good ideas from the development community"
              >
              <div className="flex items-center justify-center">
              <div>
              <div className="flex items-center justify-center">
                <Progress className="w-32 mb-4 bg-stone-300 bg-opacity-30 h-[6px]" value={progress} indicatorColor="bg-stone-200"/>
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
                              <PostPreviewSkeleton/>
                            </CarouselItem>
                            <CarouselItem key={2} className="w-full basis-1/1 md:basis-1/2 lg:basis-1/2">
                              <PostPreviewSkeleton/>
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