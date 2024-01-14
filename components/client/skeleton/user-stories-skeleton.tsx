import Container from "@/components/ui/container"
import Section from "@/components/ui/section"
import { CMS_NAME, MINIMALIST, MAGAZINE } from "@/lib/constants"
import { PostGridSkeleton } from "@/components/client/skeleton/post-grid-skeleton"
import ConfigType from "@/interfaces/config"
import { PostTableSkeleton } from "@/components/client/skeleton/post-table-skeleton"


interface Props {
    username: string
    config: ConfigType
  }

  const UserStoriesSkeleton: React.FC<Props> = ({ username, config }) => {
    return(
      <>
        <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[32px] xl:py-[32px]">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-baseline gap-[16px]">
            <h1 className="text-3xl md:text-7xl font-bold tracking-tighter leading-tight">
              {username}.
            </h1>
            <h4 className="text-center md:text-left text-lg">
              A tech blog using {CMS_NAME} as CMS
            </h4>
          </div>
        </Container>
      </section>
      <Container>
        <Section>
            {
              config && config.layout && config.layout===MINIMALIST?
                  <PostTableSkeleton/>
              :
              config && config.layout && config.layout===MAGAZINE?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                </div>  
              :
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                  <PostGridSkeleton/>
                </div>  
            }
        </Section>
      </Container>
        </>
    )
  }

  export {UserStoriesSkeleton};