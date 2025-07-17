import PostPreview from "@/components/client/post-preview";
import type PostType from "@/interfaces/post";
import Section from "@/components/ui//section";
import PostCarousel from "@/components/client/post-carousel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import DateFormatter from "@/components/ui/date-formatter";

type Props = {
  posts: PostType[];
};

const UserStoriesMagazine= ({ posts}: Props) => {

  const pinnedPosts = posts.filter(post=>post.pinned)
  const notPinnedPosts = posts.filter(post=>!post.pinned)

  const recentPosts = notPinnedPosts.slice(0,4)
  const olderPosts = notPinnedPosts.slice(4,notPinnedPosts.length)
 
  return (
    <>
      {
        pinnedPosts && pinnedPosts.length>0?
          <Section title="Pinned Stories">
            <div>
              <PostCarousel posts={pinnedPosts} basis={1} />
            </div>
          </Section>
        :
          <>
          </>
      }
      <Section title={notPinnedPosts && notPinnedPosts.length>0? `Recent Stories`:``}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          {recentPosts.map((post) => (
            <PostPreview
              key={`${post.author.name}${post.slug.number}`}
              title={post.title}
              date={post.date}
              slug={post.slug}
              excerpt={''}
              author={post.author}
              comments_count={post.comments_count}
              reactions_count={post.reactions_count}
              reading_time={post.reading_time}
              labels={post.labels}
              pinned={post.pinned}
            />
          ))}
        </div>
      </Section>
      <Section title={notPinnedPosts && notPinnedPosts.length>0? `Older Stories`:``}>
        <div className="mx-4 mt-6">
          <Card>
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4 py-3 w-1/5">Date</TableHead>
                  <TableHead></TableHead>
                  <TableHead className="py-4 w-3/4">Title</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {olderPosts.map((post) => (
                      <TableRow key={post.slug.number}>
                          <TableCell className="pl-4 py-3 w-1/5 text-[1em] xl:text-[1.2em] leading-snug"> <DateFormatter dateString={post.date} /></TableCell>
                          <TableCell>
                              {
                                  post.pinned? 
                                      <DrawingPinFilledIcon/>
                                  :
                                       <></>
                              }
                          </TableCell>
                          <TableCell className="py-4 pr-3 w-3/4 hover:underline text-[1em] xl:text-[1.2em] leading-snug font-semibold">
                              <Link href={`/${post.author.name}/stories/${post.slug.number}`}>
                                  {post.title}
                              </Link>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default UserStoriesMagazine;