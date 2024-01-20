import { getPost, getPostComments} from "@/lib/api";
import { StoryClient } from "@/components/client/story";
import Container from "@/components/ui/container";
import { unstable_cache, unstable_noStore } from "next/cache";
import PostType from "@/interfaces/post";
import CommentType from "@/interfaces/comment";

interface StoryServerProps {
  user: string;
  slug: string;
}

const getStoryContent = unstable_cache(
  async(user, slug) => {
    const postReponse =  getPost(user, slug);
    const commentsReponse = getPostComments(user, slug);

    //Parallel fetching
    return await Promise.all([postReponse,commentsReponse])
  },
  ['user-story'],
  {
    revalidate: 3600
  }
)

// Note: Server components should not use React.FC as they cannot have children or use React's context
const StoryServer = async ({ user, slug }: StoryServerProps) => {
    
    const [post, comments] = await getStoryContent(user,slug)
    
    if (!post) {
      return (
        <>
          <div className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900">
              <Container compact>
                  <div className="flex flex-col py-[48px] gap-[24px]">
                      Looks like you're lost. We couldn't find this {user}'s story.
                  </div>
              </Container>
          </div>
        </>
      )
    }

    const content = post.content

    // Return StoryClient only if post is defined
    return (
      <>
        <StoryClient post={post} content={content} comments={comments} />
      </>
    );
};


  export {StoryServer}