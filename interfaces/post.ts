import type Author from '../interfaces/author'
import type Comment from '../interfaces/comment'
import type Reactions from '../interfaces/reactions'

type PostType = {
  slug: {
    number: string,
    url: string
  },
  title: string
  date: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  comments_count: string
  reactions_count: string
  reactions: Reactions
  comments: Array<Comment>
}

export default PostType
