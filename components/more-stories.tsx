import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import Section from "./section";

type Props = {
  posts: Post[];
};

const MoreStories = ({ posts }: Props) => {
  return (
    <Section title="More stories">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {posts.map((post) => (
          <PostPreview
            key={post.slug.number}
            title={post.title}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            comments_count={post.comments_count}
            reactions_count={post.reactions_count}
            reading_time={post.reading_time}
          />
        ))}
      </div>
    </Section>
  );
};

export default MoreStories;
