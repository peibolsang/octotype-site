import { StoryServer} from "@/components/server/story";
import { Metadata, ResolvingMetadata } from 'next'
import createMetadata from "@/lib/metadata";


type Props = {
  params: {user: string, slug:string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const md = createMetadata(params.user)
  return {...md}
}

export default function Page({params}: Props) {
  return (
    <div className="dark:bg-slate-800 dark:text-white">
          <StoryServer user={params.user} slug={params.slug}/>
    </div>
  );
}