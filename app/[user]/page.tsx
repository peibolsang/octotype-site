import { UserStoriesServer } from "@/components/server/user-stories";
import { UserStoriesSkeleton } from "@/components/client/skeleton/user-stories-skeleton";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import createMetadata from "@/lib/metadata";
import { getUserConfig } from "@/lib/api";
import ConfigType from "@/interfaces/config";


type Props = {
  params: {user: string}
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const md = createMetadata(params.user)
  return {...md}
}

export default async function Page({params}: Props) {
  const config: ConfigType = await getUserConfig(params.user)
  
  return (
    <div className="dark:bg-slate-800 dark:text-white">
        <Suspense fallback={<UserStoriesSkeleton username={params.user} config={config}/>}>
          <UserStoriesServer user={params.user} config={config}/>
        </Suspense>
    </div>
  );
}