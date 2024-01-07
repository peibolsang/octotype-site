import { getPost, getPostComments} from "@/lib/api";
import { StoryClient } from "@/components/client/story";
import Container from "@/components/ui/container";
import { revalidatePath } from "next/cache";

interface StoryServerProps {
  user: string;
  slug: string;
}

// Note: Server components should not use React.FC as they cannot have children or use React's context
const StoryServer = async ({ user, slug }: StoryServerProps) => {

    const post = await getPost(user, slug);
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

    const commentsdata = await getPostComments(user, slug);
    const content = post.content


    //revalidatePath('/[user]/stories/[slug]', 'page')

    // Return StoryClient only if post is defined
    return (
      <>
        <StoryClient post={post} content={content} comments={commentsdata} />
      </>
    );
};


  export {StoryServer}