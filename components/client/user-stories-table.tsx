import type PostType from "@/interfaces/post";
import Section from "@/components/ui//section";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Card } from "@/components/ui/card";
import DateFormatter from "@/components/ui/date-formatter";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Props = {
  posts: PostType[];
};

const UserStoriesTable = ({ posts}: Props) => {
  return (
    <Section>
      <div className="w-full">
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
                {posts.map((post) => (
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
                            <Link
                                as={`/${post.author.name}/stories/${post.slug.number}`}
                                href={`/${post.author.name}/stories/[slug]`}
                            >
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
  );
};

export default UserStoriesTable;