import Container from "@/components/ui/container"
import Section from "@/components/ui/section"
import { CMS_NAME, MINIMALIST, MAGAZINE } from "@/lib/constants"
import { PostGridSkeleton } from "@/components/client/skeleton/post-grid-skeleton"
import ConfigType from "@/interfaces/config"
import { PostTableSkeleton } from "@/components/client/skeleton/post-table-skeleton"


  const UserStoriesSkeleton = () => {
    return(
      <Container>
        <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                </div>  
        </Section>
      </Container>
    )
  }

  export {UserStoriesSkeleton};