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
import PostPreview from "@/components/client/post-preview";
import PostType from "@/interfaces/post";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";


  interface LatestStoriesProps {
    lastPosts: PostType[]; // Use the Post interface here
  }

  const LatestStoriesClient: React.FC<LatestStoriesProps> = ({ lastPosts }) => {

    const [api, setApi] = useState<CarouselApi>()
    const [progress, setProgress] = useState(0)
    const [numberOfCards, setNumberOfCards] = useState(0)
    const [currentCard, setCurrentCard] = useState(1)

    useEffect(() => {
      if (!api) {
        return;
      }
     
      setNumberOfCards(api.slideNodes().length-1)
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
                    <div className="text-sm flex items-center justify-center block md:hideen lg:hidden">
                      {currentCard}/{numberOfCards}
                      <DoubleArrowRightIcon className="ml-1"/>
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
                      {lastPosts.map((post) => (
                        <CarouselItem key={`${post.author.name}${post.slug.number}`} className="w-full basis-1/1 md:basis-1/2 lg:basis-1/2">
                          <PostPreview
                            key={post.slug.number}
                            title={post.title}
                            date={post.date}
                            author={post.author}
                            slug={post.slug}
                            excerpt={""}
                            comments_count={post.comments_count}
                            reactions_count={post.reactions_count}
                            reading_time={post.reading_time}
                          />
                        </CarouselItem>
                      ))}
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

export {LatestStoriesClient};