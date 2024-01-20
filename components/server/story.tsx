import { getPost, getPostComments} from "@/lib/api";
import { StoryClient } from "@/components/client/story";
import Container from "@/components/ui/container";
import { unstable_cache } from "next/cache";

interface StoryServerProps {
  user: string;
  slug: string;
}

interface UserErrorProps {
  user: string;
}

const getStory = unstable_cache(
  async(user, slug) =>{

    // Parallel fetching
    const postReponse =  getPost(user, slug);
    const commentsReponse = getPostComments(user, slug);

    return await Promise.all([postReponse,commentsReponse])

  },
  ['user-story'],
  {
    revalidate: 3600
  }
)

const Story404: React.FC<UserErrorProps> = ({user}) => {
  return(
    <div className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900">
      <Container compact>
        <div className="flex flex-col py-[48px] gap-[24px]">
        Looks like you're lost. We couldn't find this {user}'s story.
      </div>
    </Container>
  </div>)
}


// Note: Server components should not use React.FC as they cannot have children or use React's context
const StoryServer = async ({ user, slug }: StoryServerProps) => {
  
    const [post, comments] = await getStory(user,slug)
    
    if (!post || !post.content)  {
      return <Story404 user={user} />
    }

    const content = post.content
    return <StoryClient post={post} content={content} comments={comments} />
};


  export {StoryServer}