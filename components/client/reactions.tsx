import Link from 'next/link'
import type ReactionsType from '@/interfaces/reactions'
import type Icons from '@/interfaces/icons'
import { REPO_NAME } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'

type Props = {
  reactions: ReactionsType,
  issuenumber: string,
  username: string
}


const icons: Icons = {
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
    <div className="flex items-center">
      {Object.entries(reactions).map(([key, value]) => {
        if (value.toString() !== "0") {
          return (
            <div key={key} className="mb-5 flex items-center">
              <Badge className="mr-3 bg-[#9aae8e] bg-opacity-70 text-white p-1 border-2 border-[#9aae8e] rounded-full hover:bg-bg-[#9aae8e] hover:bg-opacity-100 dark:bg-[#818CF8] dark:bg-opacity-50 dark:hover:bg-opacity-100 dark:border-[#818CF8]">
                <Link href={href}>
                  <span className="text-l mr-2  text-sm" dangerouslySetInnerHTML={{ __html: `${icons[key]} ${value}` }}></span>
                </Link>
              </Badge>
            </div>
          );
        }
        return null;
      })}
      <div className="mb-5 flex items-center">
        <Badge className="mr-3 hover:bg-slate-200 dark:bg-slate-400 bg-gray-100 p-1 border-2 border-gray-300 rounded-full">
          <Link href={href}>
              <span className="text-l mr-2 text-sm text-black" dangerouslySetInnerHTML={{ __html: `${icons.new} +` }}></span>
          </Link>
        </Badge>
      </div>
    </div>
  );
}

export default Reactions