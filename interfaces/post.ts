import type Author from '@/interfaces/author'
import type Comment from '@/interfaces/comment'
import type Reactions from '@/interfaces/reactions'
import LabelType from './label'

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
  reading_time: string
  html_url: string
  labels: Array<LabelType>
}

export default PostType
