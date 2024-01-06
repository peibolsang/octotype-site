'use client'
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import PostType from "@/interfaces/post";
import PostCarousel from "./post-carousel";


  interface AllStoriesProps {
    lastPosts: PostType[]; // Use the Post interface here
  }

  const AllStoriesClient: React.FC<AllStoriesProps> = ({ lastPosts }) => {
    
    return (
      <>
        <Container>
          <Section
            title="Latest stories"
            description="Catch up with good ideas from the development community">
            <PostCarousel posts={lastPosts} basis={2}/>
          </Section>
        </Container>
      </>
      );
}

export {AllStoriesClient};