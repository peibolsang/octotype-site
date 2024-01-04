'use client'
import PostType from "@/interfaces/post";
import Head from "next/head";
import PostHeader from "@/components/client/post-header";
import Container from "@/components/ui/container";
import PostBody from "./post-body";
import PostComments from "./post-comments";
import CommentType from "@/interfaces/comment";

interface StoryProps {
  post: PostType; // Use the Post interface here
  content: string;
  comments: CommentType[]
}


  const StoryClient: React.FC<StoryProps> = ({ post, content, comments }) => {
    return(
      <>
        <article className="mb-16">
        <Head>
          <title>
            {post.title} - {post.author.name}'s Blog on octotype
          </title>
          <meta property="og:image" content={post.ogImage.url} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={post.ogImage.url} />
          <meta name="twitter:title" content={post.title} />
        </Head>
            <PostHeader
                title={post.title}
                date={post.date}
                author={post.author}
                issuenumber={post.slug.number}
                reactions={post.reactions}
                reading_time={post.reading_time}
                html_url={post.html_url}
            />
        <Container compact>
          <PostBody content={content} />
        </Container>
      </article>
      <div className="border-t-2 border-slate-200 pt-5">
          <PostComments
            comments={comments}
            issuenumber={post.slug.number}
            username={post.author.name}
          />
        </div>
    </>
      
    )
  }

  export {StoryClient};




