import Link from 'next/link'
import type Reactions from '../interfaces/reactions'
import { REPO_NAME } from '../lib/constants'

type Props = {
  reactions: Reactions,
  issuenumber: string,
  username: string
}

const icons = {
  plusone: '&#x1F44D;',
  minusone: '&#x1F44E;',
  laugh: '&#128512;',
  hooray: '&#x1F389;',
  confused: '&#x1F615;',
  heart: '&#x2764;',
  rocket: '&#x1F680;',
  eyes: '&#x1F440;',
  new: '&#x1F642;'
}

const Reactions = ({ reactions,issuenumber,username }: Props) => {
  const href=`https://github.com/${username}/${REPO_NAME}/issues/${issuenumber}#issuecomment-new`
  return (
    <>
      {Object.entries(reactions).map(([key, value]) => {
        if (value.toString() !== "0") {
          return (
            <div className="mb-5 flex items-center">
              <div className="mr-3 bg-blue-100 p-1 border-2 border-blue-300 rounded-full">
                <Link href={href}>
                  <span className="text-l mr-2 text-blue-500 text-sm" dangerouslySetInnerHTML={{ __html: `${icons[key]} ${value}` }}></span>
                </Link>
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="mb-5 flex items-center">
        <div className="mr-3 dark:bg-slate-400 bg-gray-100 p-1 border-2 border-gray-300 rounded-full">
          <Link href={href}>
              <span className="text-l mr-2 text-sm" dangerouslySetInnerHTML={{ __html: `${icons.new} +` }}></span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Reactions
