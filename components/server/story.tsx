import { getPost, getPostComments} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { StoryClient } from "@/components/client/story";
import Container from "@/components/ui/container";
import { revalidatePath } from "next/cache";

interface StoryServerProps {
  user: string;
  slug: string;
}

// Note: Server components should not use React.FC as they cannot have children or use React's context
const StoryServer = async ({ user, slug }: StoryServerProps) => {
  try {
    const post = await getPost(user, slug);
    if (!post) {
      throw new Error("Post not found");
    }

    const commentsdata = await getPostComments(user, slug);
    const content = await markdownToHtml(post.content || "");


    revalidatePath('/(user)/stories/[slug]', 'page')

    // Return StoryClient only if post is defined
    return (
      <>
        <StoryClient post={post} content={content} comments={commentsdata} />
      </>
    );
  } catch (error) {
    // Check if error is an instance of Error
    const message = error instanceof Error ? error.message : "An unknown error occurred";

    // Handle error by returning an error component or a message
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
};


  export {StoryServer}