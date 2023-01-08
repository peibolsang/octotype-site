import type Comment from '../interfaces/comment'
import Avatar from './avatar'
import DateFormatter from './date-formatter'
import Reactions from './reactions'
import markdownStyles from './markdown-styles.module.css'
import { REPO_NAME } from '../lib/constants'

type Props = {
  comments: Comment[],
  issuenumber: string,
  username: string
}

const PostComments = ({ comments, issuenumber, username }: Props) => {
  return (
    <section>
      <h3 className="mb-8 text-4xl md:text-4xl font-bold tracking-tighter leading-tight">
        Comments {comments.length>0 ? ` (${comments.length})`: ""}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-y-8 mb-6">
        {
        (comments.length==0 || comments[0].content) ? (
          comments.map((comment) => (
            <div className="border-2 border-color-gray rounded-xl">
              <div className="flex items-center bg-gray-100 rounded-t-xl p-3">
                <Avatar key={comment.date} name={comment.author.name} picture={comment.author.picture} html_url={comment.author.html_url} />
                <span className="ml-1 mr-1">on</span>
                <DateFormatter key={comment.date} dateString={comment.date} />
              </div>
              <div className={`pl-5 ${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html: comment.content }}>
              </div>
              <div className="sm:flex flex-row md:flex items-center ml-5">
                <Reactions key={comment.date} reactions={comment.reactions} issuenumber={issuenumber} username={username}/>
              </div>
            </div>
          ))
        )
        :
        (<div>{comments[0].toString()}
        </div>)
        }
        <div className="flex justify-center mb-10 mt-10">
          <button className="dark:bg-white dark:text-black bg-black rounded-xl text-white py-2 px-4 max-w-sm" onClick={() => window.location.href = `https://github.com/${username}/${REPO_NAME}/issues/${issuenumber}#issuecomment-new` }>
            Leave a New Comment
          </button>
        </div>
      </div>
    </section>
  )
}

export default PostComments
