import { UserStoriesServer} from "@/components/server/user-stories";
import { Metadata, ResolvingMetadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/container";
import { CMS_NAME } from "@/lib/constants";
import { Suspense } from "react";
import { UserStoriesSkeleton } from "@/components/client/skeleton/user-stories-skeleton";
import { getAllUsers } from "@/lib/api";

interface UserPageProps {
  params: Promise<{ user: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const users = await getAllUsers();
  return users.map((user) => ({
    user: user,
  }));
}

export async function generateMetadata(
  { params }: UserPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const md = createMetadata(resolvedParams.user)
  return {...md}
}

export default async function Page({params}: UserPageProps) {
  const resolvedParams = await params;
  
  return (
    <div className="dark:bg-slate-800 dark:text-white">
      <section className="bg-[#f4f1ea] bg-opacity-70 dark:bg-slate-900 py-[32px] xl:py-[32px]">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between items-baseline gap-[16px]">
            <h1 className="text-3xl md:text-7xl font-bold tracking-tighter leading-tight">
              {resolvedParams.user}.
            </h1>
            <h4 className="text-center md:text-left text-lg">
              A tech blog using {CMS_NAME} as CMS
            </h4>
          </div>
        </Container>
      </section>
      <Suspense fallback={<UserStoriesSkeleton/>}>
        <UserStoriesServer user={resolvedParams.user}/>
      </Suspense>
    </div>
  );
}

export const dynamic = "force-static";
export const runtime = "nodejs";