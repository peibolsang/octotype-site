import { getAllPosts} from "@/lib/api";
import { UserFeaturedStoryClient } from "@/components/client/user-featured-story";
import Container from "@/components/ui/container";
import UserMoreStoriesClient from "@/components/client/user-more-stories";
import { HowItWorks } from "../client/how-it-works";
import Section from "@/components/ui/section";
import { PostPreviewSkeleton } from "../client/skeleton/post-preview-skeleton";
import { revalidatePath } from 'next/cache'

interface UserStoriesServerProps {
  user: string;
}

// Note: Server components should not use React.FC as they cannot have children or use React's context
const UserStoriesServer = async ({ user }: UserStoriesServerProps) => {
  
    const users = [user]
    const allPosts = (await Promise.all(
      users.map(async (user) => {
        return await getAllPosts(user);
      })
    )).flatMap(posts => posts || []);

    const lastPosts = allPosts.flat().sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    
      const featuredPost = lastPosts?.[0] ?? null;
      const morePosts = lastPosts?.slice(1) ?? [];

      revalidatePath('/[user]', 'page')

      return (
        <>
          {
            lastPosts.length>0?
            <div>
              <UserFeaturedStoryClient featuredPost={featuredPost} user={user} />
                <Container>
                {morePosts.length > 0 && <UserMoreStoriesClient posts={morePosts} />}
              </Container>
            </div>
            :
            <>
              <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[16px] xl:py-[32px]">
                <Container>
                <div className="flex flex-col lg:flex-row justify-between items-baseline gap-[16px]">
                  <h1 className="text-[#ef4444] dark:text-[#f87171] text-3xl md:text-7xl font-bold tracking-tighter leading-tight">
                    {user}.
                  </h1>
                  <h4 className="text-[#ef4444] dark:text-[#f87171] text-center md:text-left text-lg">
                    You haven't initialized Octotype yet!
                  </h4>
                </div>
                <Section>
                  <div className="flex flex-col lg:flex-row gap-[16px] w-full">
                    <HowItWorks/>
                  </div>
                </Section>
              </Container>
            </section>
          </>
          }
        </>
      )
  };

  export {UserStoriesServer}