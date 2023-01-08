import Link from "next/link"

type Props = {
  name: string
  picture: string
  html_url: string
}

const Avatar = ({ name, picture, html_url }: Props) => {
  return (
    <div className="flex items-center">
      
        <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
        <div className="text-l font-bold"><Link className="no-underline hover:underline" href={html_url}>by {name}</Link></div>
      
    </div>
  )
}

export default Avatar
