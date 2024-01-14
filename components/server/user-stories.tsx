import { getAllPosts, getPinnedPosts, hasRepo} from "@/lib/api";
import Container from "@/components/ui/container";
import UserStoriesTable from "@/components/client/user-stories-table";
import { HowItWorks } from "../client/how-it-works";
import Section from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from 'next/cache'
import { CMS_NAME } from "@/lib/constants";
import PostType from "@/interfaces/post";
import ConfigType from "@/interfaces/config";
import UserStoriesGrid from "@/components/client/user-stories-grid";
import UserStoriesMagazine from "@/components/client/user-stories-magazine";
import { MINIMALIST, MAGAZINE } from "@/lib/constants";

interface UserStoriesServerProps {
  user: string;
  config: ConfigType
}

interface UserErrorProps {
  user: string;
}

const UserError: React.FC<UserErrorProps> = async ({ user}) => {
  const hasRepoFlag = await hasRepo(user)
  return (
    <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[16px] xl:py-[32px]">
      <Container>
        <Section>
          {
            hasRepoFlag?
              <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                We couldn't find stories for this user
              </Badge>
            :
              <Badge variant="outline" className="bg-red-200 text-red-500 dark:bg-red-500 dark:text-white inline-flex items-center gap-2 w-fit py-1 px-2 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                User not initialized yet
              </Badge>
          }
          <div className="flex flex-col lg:flex-row w-full">
            <HowItWorks username={user} showUserProgress={hasRepoFlag}/>
          </div>
        </Section>
      </Container>
    </section>
  )
}

const movePinnedPostsFirst = async (sortedPosts: PostType[])=> {

  const pinnedSlugNumbers = await getPinnedPosts(sortedPosts)

    const pinnedPosts = sortedPosts.filter(post => pinnedSlugNumbers
      .includes(post.slug.number))
      .map(post=>{return{ ...post, pinned:true}})
    
    const morePosts = sortedPosts.filter(post=>!pinnedSlugNumbers.includes(post.slug.number))
    return pinnedPosts.concat(morePosts)
}


// Note: Server components should not use React.FC as they cannot have children or use React's context
const UserStoriesServer = async ({ user, config }: UserStoriesServerProps) => {
  
    const users = [user]
    const allPosts = (await Promise.all(users.map(async (user) => await getAllPosts(user))))
      .flatMap(posts => posts || []);

    const sortedPosts = allPosts.flat().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    const finalPosts = await movePinnedPostsFirst(sortedPosts)
    
    //revalidatePath('/[user]', 'page')

      return (
        <>
          {
            finalPosts && finalPosts.length>0?
            <div>
              <Container>
               {
                config && config.layout && config.layout===MINIMALIST? 
                  finalPosts.length > 0 && <UserStoriesTable posts={finalPosts} />
                :
                config && config.layout && config.layout===MAGAZINE? 
                  finalPosts.length > 0 && <UserStoriesMagazine posts={finalPosts}/>
                :
                  finalPosts.length > 0 && <UserStoriesGrid posts={finalPosts}/>
               } 
              </Container>
            </div>
            :
            <UserError user={user}/>
          }
        </>
      )
  };

  export {UserStoriesServer}