import Link from "next/link";

type Props = {
  name: string;
  picture: string;
  html_url: string;
};

const Avatar = ({ name, picture, html_url }: Props) => {
  return (
    <Link className="no-underline hover:underline w-fit" href={html_url}>
      <div className="flex items-center gap-2 ">
        <img src={picture} className="w-8 h-8 rounded-full" alt={name} />
        <div className="text-l font-medium">by {name}</div>
      </div>
    </Link>
  );
};

export default Avatar;
