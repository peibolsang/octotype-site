import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import type Author from "../interfaces/author";
import Reactions from "./reactions";
import Link from "next/link";
import Container from "./container";
import Tag from "./tag";

type Props = {
  title: string;
  date: string;
  author: Author;
  issuenumber: string;
  reactions: Reactions;
  reading_time: string;
  html_url: string;
};

const PostHeader = ({
  title,
  date,
  author,
  issuenumber,
  reactions,
  reading_time,
  html_url,
}: Props) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900">
      <Container compact>
        <div className="flex flex-col py-[48px] gap-[24px]">
          <Tag bordered>
            <div>
              <DateFormatter dateString={date} /> · {reading_time} minute
              {reading_time === "1" ? "" : "s"} read
            </div>
          </Tag>
          <PostTitle>{title}</PostTitle>
          <div className="flex flex-col md:flex-row gap-[16px] md:items-center">
            <Avatar
              name={author.name}
              picture={author.picture}
              html_url={author.html_url}
            />

            <div className="text-l text-gray-400 ">
              Originally published as a{" "}
              <Link className="text-blue-400 underline" href={html_url}>
                GitHub Issue
              </Link>{" "}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostHeader;
