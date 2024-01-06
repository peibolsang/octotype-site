'use client'
import PostType from "@/interfaces/post";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section"
import { CMS_NAME } from "@/lib/constants";
import PostCarousel from "./post-carousel";
import { Badge } from "@/components/ui/badge";


interface UserFeaturedStoriesProps {
    featuredPosts: PostType[]; // Use the Post interface here
    user: string
  }

  const UserFeaturedStoriesClient: React.FC<UserFeaturedStoriesProps> = ({ featuredPosts, user }) => {

    return(
      <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[16px] xl:py-[32px]">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-baseline gap-[16px]">
          <h1 className="text-3xl md:text-7xl font-bold tracking-tighter leading-tight">
            {user}.
          </h1>
          <h4 className="text-center md:text-left text-lg">
            A tech blog using {CMS_NAME} as CMS
          </h4>
        </div>
        <Section title="Pinned stories">
            {
              featuredPosts && featuredPosts.length>0? 
                <PostCarousel posts={featuredPosts} basis={1} /> 
              : 
                <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                  {user} has no pinned stories yet
                </Badge>
            }        
        </Section>
      </Container>
    </section>
    )
  }

  export {UserFeaturedStoriesClient};