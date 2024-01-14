'use client'
import { useState, useEffect } from "react";
import {Carousel, CarouselContent, CarouselItem, ResponsiveCarouselButtons, CarouselApi} from "@/components/ui/carousel"
import PostPreview from "@/components/client/post-preview";
import PostType from "@/interfaces/post";
import { Progress } from "@/components/ui/progress";
import { DoubleArrowRightIcon, DoubleArrowLeftIcon } from "@radix-ui/react-icons";

interface PostCarouselProps {
    posts: PostType[]; // Use the Post interface here
    basis: number
  }

const PostCarousel: React.FC<PostCarouselProps> = ({ posts, basis }) => {

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
                {posts.map((post) => (
                  <CarouselItem key={`${post.author.name}${post.slug.number}`} className={`w-full basis-1/1 md:basis-1/${basis} lg:basis-1/${basis}`}>
                    <PostPreview
                      key={post.slug.number}
                      title={post.title}
                      date={post.date}
                      author={post.author}
                      slug={post.slug}
                      excerpt={post.excerpt}
                      comments_count={post.comments_count}
                      reactions_count={post.reactions_count}
                      reading_time={post.reading_time}
                      labels={post.labels}
                      pinned={post.pinned}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <ResponsiveCarouselButtons className="dark:hover:bg-slate-400 dark:hover:text-black" />
            </Carousel>
          </div>
        </div>
    )
}

export default PostCarousel