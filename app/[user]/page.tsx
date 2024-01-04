import { UserStoriesServer } from "@/components/server/user-stories";
import Head from "next/head";
import MainHeader from "@/components/client/main-header";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import { UserStoriesSkeleton } from "@/components/client/skeleton/user-stories-skeleton";
import { Suspense } from "react";

export default function Page({params}: {params: {user: string}}) {
 
  const finalUser = params.user
  return (
    <div className="dark:bg-slate-800 dark:text-white">
        <Head>
          <title>{params.user} on octotype</title>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:title" content={params.user} />
        </Head>
        <MainHeader />
        <Suspense fallback={<UserStoriesSkeleton username={params.user}/>}>
          <UserStoriesServer user={finalUser}/>
        </Suspense>
    </div>
  );
}