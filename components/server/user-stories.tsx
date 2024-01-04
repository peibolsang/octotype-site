import { getAllPosts} from "@/lib/api";
import { UserFeaturedStoryClient } from "@/components/client/user-featured-story";
import Container from "@/components/ui/container";
import UserMoreStoriesClient from "@/components/client/user-more-stories";

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
      return (
        <>
            <UserFeaturedStoryClient featuredPost={featuredPost} user={user} />
            <Container>
                {morePosts.length > 0 && <UserMoreStoriesClient posts={morePosts} />}
            </Container>
        </>
      )
  };

  export {UserStoriesServer}