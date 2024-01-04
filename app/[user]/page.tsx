import { UserStoriesServer } from "@/components/server/user-stories";
import MainHeader from "@/components/client/main-header";

import { UserStoriesSkeleton } from "@/components/client/skeleton/user-stories-skeleton";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import createMetadata from "@/lib/metadata";


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

export default function Page({params}: Props) {
 
  const finalUser = params.user
  return (
    <div className="dark:bg-slate-800 dark:text-white">
        <MainHeader />
        <Suspense fallback={<UserStoriesSkeleton username={params.user}/>}>
          <UserStoriesServer user={finalUser}/>
        </Suspense>
    </div>
  );
}