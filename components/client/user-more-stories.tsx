import PostPreview from "@/components/client/post-preview";
import type Post from "@/interfaces/post";
import Section from "@/components/ui//section";

type Props = {
  posts: Post[];
};

const UserMoreStoriesClient = ({ posts }: Props) => {
  return (
    <Section title="More stories">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {posts.map((post) => (
          <PostPreview
            key={`${post.author.name}${post.slug.number}`}
            title={post.title}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={''}
            comments_count={post.comments_count}
            reactions_count={post.reactions_count}
            reading_time={post.reading_time}
          />
        ))}
      </div>
    </Section>
  );
};

export default UserMoreStoriesClient;