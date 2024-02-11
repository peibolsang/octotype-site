import { getAllPosts, getPinnedPosts} from "@/lib/api";
import Container from "@/components/ui/container";
import UserStoriesTable from "@/components/client/user-stories-table";
import { unstable_cache, unstable_noStore } from 'next/cache'
import { getUserConfig } from "@/lib/api";
import PostType from "@/interfaces/post";
import UserStoriesGrid from "@/components/client/user-stories-grid";
import UserStoriesMagazine from "@/components/client/user-stories-magazine";
import { MINIMALIST, MAGAZINE } from "@/lib/constants";
import { UserError } from "@/components/client/errors/user-error";

interface UserStoriesServerProps {
  user: string;
}


const movePinnedPostsFirst = async (sortedPosts: PostType[])=> {

  const pinnedSlugNumbers = await getPinnedPosts(sortedPosts)

    const pinnedPosts = sortedPosts.filter(post => pinnedSlugNumbers
      .includes(post.slug.number))
      .map(post=>{return{ ...post, pinned:true}})
    
    const morePosts = sortedPosts.filter(post=>!pinnedSlugNumbers.includes(post.slug.number))
    return pinnedPosts.concat(morePosts)
}

const getUserStories = unstable_cache(
  async (user:string) => {
    const users = [user]
    const allPosts = (await Promise.all(users.map(async (user) => await getAllPosts(user))))
      .flatMap(posts => posts || []);
  
    const sortedPosts = allPosts.flat().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  
    // Parallel fetching
    const finalPostsReponse = movePinnedPostsFirst(sortedPosts)
    const configResponse = getUserConfig(user)
  
    return await Promise.all([finalPostsReponse,configResponse])
  
  },
  ['user-stories'],
  {
    revalidate: 3600
  }
)


// Note: Server components should not use React.FC as they cannot have children or use React's context
const UserStoriesServer = async ({ user }: UserStoriesServerProps) => {

    const [finalPosts, config] = await getUserStories(user)

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