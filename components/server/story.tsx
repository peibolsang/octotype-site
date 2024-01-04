import { getPost, getPostComments} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { StoryClient } from "@/components/client/story";

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
    return <div>Error: {message}</div>;
  }
};


  export {StoryServer}