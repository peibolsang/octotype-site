import { StoryServer } from "@/components/server/story";
import Head from "next/head";
import MainHeader from "@/components/client/main-header";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";


export default function Page({params}: {params: {user: string, slug: string}}) {
 
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
        <StoryServer user={params.user} slug={params.slug}/>
    </div>
  );
}