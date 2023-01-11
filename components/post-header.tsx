import Avatar from './avatar'
import DateFormatter from './date-formatter'
import PostTitle from './post-title'
import type Author from '../interfaces/author'
import Reactions from './reactions'
import Link from 'next/link'

type Props = {
  title: string
  date: string
  author: Author
  issuenumber: string
  reactions: Reactions
  reading_time: string
  html_url:string
}

const PostHeader = ({ title, date, author, issuenumber, reactions, reading_time, html_url }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      
      <div className="mb-6 flex items-center justify-center xl:justify-start">
      <Avatar name={author.name} picture={author.picture} html_url={author.html_url} />
      </div>
      <div>
        <div className="text-l mb-5 text-gray-400 text-center xl:text-left">
        Originally published as a <Link className="text-blue-400 underline" href={html_url}>GitHub Issue</Link> on <DateFormatter dateString={date} /> · {reading_time} minute{reading_time==="1"? "":"s"} read
        </div>
      </div>
      <div className="md:flex items-center sm:flex flex-row">
        <Reactions reactions={reactions} issuenumber={issuenumber} username={author.name} />
      </div>
    </>
  )
}

export default PostHeader
