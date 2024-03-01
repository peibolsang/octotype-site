import { getPost, getPostComments} from "@/lib/api";
import { StoryClient } from "@/components/client/story";
import { Story404 } from "@/components/client/errors/story-404";

interface StoryServerProps {
  user: string;
  slug: string;
}

const getStory = async(user:string, slug:string) =>{
  // Parallel fetching
  const postReponse =  getPost(user, slug);
  const commentsReponse = getPostComments(user, slug);

  return await Promise.all([postReponse,commentsReponse])
}

// Note: Server components should not use React.FC as they cannot have children or use React's context
const StoryServer = async ({ user, slug }: StoryServerProps) => {

    const [post, comments] = await getStory(user,slug)
    
    if (!post || !post.content)  {
      return <Story404 user={user} />
    }

    post.comments = comments
    return <StoryClient post={post} />
};


export {StoryServer}