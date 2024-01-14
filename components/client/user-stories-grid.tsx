import PostPreview from "@/components/client/post-preview";
import type PostType from "@/interfaces/post";
import Section from "@/components/ui//section";

type Props = {
  posts: PostType[];
};

const UserStoriesGrid = ({ posts}: Props) => {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        {posts.map((post) => (
          <PostPreview
            key={`${post.author.name}${post.slug.number}`}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={''}
            author={post.author}
            comments_count={post.comments_count}
            reactions_count={post.reactions_count}
            reading_time={post.reading_time}
            labels={post.labels}
            pinned={post.pinned}
          />
        ))}
      </div>
    </Section>
  );
};

export default UserStoriesGrid;