import type Author from '../interfaces/author'
import type Reactions from '../interfaces/reactions'

type CommentType = {
  slug: {
    number: string,
    url: string
  },
  date: string
  author: Author
  ogImage: {
    url: string
  }
  content: string
  reactions_count: string
  reactions: Reactions

}

export default CommentType