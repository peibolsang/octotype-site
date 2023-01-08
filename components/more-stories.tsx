import PostPreview from './post-preview'
import type Post from '../interfaces/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h3 className="mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight">
        More Stories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-16 mb-6 p-6">
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
    </section>
  )
}

export default MoreStories
