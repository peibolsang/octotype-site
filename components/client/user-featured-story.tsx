'use client'
import PostPreview from "@/components/client/post-preview";
import PostType from "@/interfaces/post";
import Intro from "@/components/client/intro";


interface UserFeaturedStoryProps {
    featuredPost: PostType; // Use the Post interface here
    user: string
  }

  const UserFeaturedStoryClient: React.FC<UserFeaturedStoryProps> = ({ featuredPost, user }) => {
    return(
    <Intro
        username={user}
        featuredPost={
            <div>
            {featuredPost?.title ? (
                <PostPreview
                    title={featuredPost?.title}
                    date={featuredPost?.date}
                    author={featuredPost?.author}
                    slug={featuredPost?.slug}
                    excerpt={featuredPost?.excerpt}
                    comments_count={featuredPost?.comments_count}
                    reactions_count={featuredPost?.reactions_count}
                    reading_time={featuredPost?.reading_time}
                    labels={featuredPost?.labels}
                />
                ) : (
                <div>{featuredPost?.toString()}</div>
                )}
            </div>
        }
  />
    )
  }

  export {UserFeaturedStoryClient};