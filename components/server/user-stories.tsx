import { getAllPosts, getPinnedPosts, hasRepo} from "@/lib/api";
import { UserFeaturedStoriesClient } from "@/components/client/user-featured-stories";
import Container from "@/components/ui/container";
import UserMoreStoriesClient from "@/components/client/user-more-stories";
import { HowItWorks } from "../client/how-it-works";
import Section from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from 'next/cache'
import { CMS_NAME } from "@/lib/constants";

interface UserStoriesServerProps {
  user: string;
}

interface UserErrorProps {
  user: string;
  hasRepo:boolean
}

const UserError: React.FC<UserErrorProps> = ({ user, hasRepo }) => {
  return (
    <>
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
                <Section>
                  {
                    hasRepo?
                      <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                        We couldn't find stories for this user
                      </Badge>
                    :
                      <Badge variant="outline" className="bg-red-200 text-red-500 dark:bg-red-500 dark:text-white inline-flex items-center gap-2 w-fit py-1 px-2 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                        User not initialized yet
                      </Badge>
                  }
                  <div className="flex flex-col lg:flex-row w-full">
                    <HowItWorks username={user} showUserProgress={hasRepo}/>
                  </div>
                </Section>
              </Container>
            </section>
          </>
  )

}
// Note: Server components should not use React.FC as they cannot have children or use React's context
const UserStoriesServer = async ({ user }: UserStoriesServerProps) => {
  
    const users = [user]
    const allPosts = (await Promise.all(
      users.map(async (user) => {
        return await getAllPosts(user);
      })
    )).flatMap(posts => posts || []);

    const hasRepoFlag = await hasRepo(user)

    const lastPosts = allPosts.flat().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      const pinnedSlugNumbers = await getPinnedPosts(lastPosts)
      const pinnedPosts = lastPosts.filter(post => 
        pinnedSlugNumbers.includes(post.slug.number)
    );
      //revalidatePath('/[user]', 'page')

      return (
        <>
          {
            lastPosts.length>0?
            <div>
              <UserFeaturedStoriesClient featuredPosts={pinnedPosts} user={user} />
              <Container>
                {lastPosts.length > 0 && <UserMoreStoriesClient posts={lastPosts} user={user} />}
              </Container>
            </div>
            :
            <UserError user={user} hasRepo={hasRepoFlag}/>
          }
        </>
      )
  };

  export {UserStoriesServer}