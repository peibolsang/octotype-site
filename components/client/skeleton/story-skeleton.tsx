'use client'
import Head from "next/head";
import Container from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";


interface Props {
    username: string
}
   
const StorySkeleton: React.FC<Props> = ({ username }) => {
    return(
      <>
        <article className="mb-16">
        <Head>
          <title>
            New - {username}'s Blog on octotype
          </title>
        </Head>
        <div className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900">
            <Container compact>
                <div className="flex flex-col py-[48px] gap-[24px]">
                    <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.875rem] font-medium font-mono border-none mb-4">
                        ...
                    </Badge>
                    <h1 className={`text-center md:text-left lg:text-left text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-4`}>
                        <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 ml-2 mb-2 w-full h-[50px] rounded-lg" />
                        <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 ml-2 mb-2 w-full h-[50px] rounded-lg" />
                        <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 ml-2 mb-2 w-full h-[50px] rounded-lg" />
                        <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 ml-2 mb-2 w-full h-[50px] rounded-lg" />
                    </h1>
                    <div className="flex flex-col md:flex-row gap-[16px] md:items-center">
                        <div className="flex items-center">
                            <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 h-10 w-10 shrink-0 overflow-hidden rounded-full" />
                            <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                        </div>
                        <div className="text-l text-gray-400 ">
                            <Skeleton className="bg-black bg-opacity-20 dark:bg-slate-800 ml-2 w-20 h-[18px] rounded-lg" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
        <Container>
            <div className="py-[32px]">
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
            </div>
            <div className="py-[16px]">
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
                <Skeleton className="bg-[#f4f1ea] dark:bg-slate-200 ml-2 mb-2 w-full h-[18px] rounded-lg" />
            </div>
        </Container>
      </article>
    </>
      
    )
  }

  export {StorySkeleton};