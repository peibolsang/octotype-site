import type CommentType from "@/interfaces/comment";
import Avatar from "@/components/ui/avatar";
import DateFormatter from "@/components/ui/date-formatter";
import Reactions from "@/components/client/reactions";
import Container from "@/components/ui/container";
import { REPO_NAME } from "@/lib/constants";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import markdownStyles from "@/components/ui/markdown-styles.module.css";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coldarkCold} from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  comments: CommentType[];
  issuenumber: string;
  username: string;
};

const PostComments = ({ comments, issuenumber, username }: Props) => {
  return (
    <section>
      <Container compact>
        <h3 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
          Comments {comments.length > 0 ? ` (${comments.length})` : ""}
        </h3>
        <div className="grid grid-cols-1 gap-y-8 mb-6">
          {comments.length == 0 || comments[0].content ? (
            comments.map((comment) => (
              <div className="border-2 border-[#f4f1ea] dark:border-slate-500  rounded-xl">
                <div className="flex items-center bg-[#f4f1ea] dark:bg-slate-500 dark:text-white rounded-t-[4px] p-3">
                  <Avatar
                    key={comment.date}
                    name={comment.author.name}
                    picture={comment.author.picture}
                    html_url={comment.author.html_url}
                  />
                  <span className="ml-1 mr-1">on</span>
                  <DateFormatter key={comment.date} dateString={comment.date} />
                </div>
                <div className="px-5"
                >
                  <Markdown
                    className={markdownStyles["markdown"]} 
                    remarkPlugins={[remarkGfm]}
                    children={comment.content}
                    components={{
                      code(props){
                      const {children, className, node, ...rest} = props
                      const match = /language-(\w+)/.exec(className || '')
                      return match ? (
                        <SyntaxHighlighter
                          PreTag="div"
                          children={String(children).replace(/\n$/, '')}
                          language={match[1]}
                          style={coldarkCold}
                        />
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      )
                      }
                    }
                    }
                  />
                </div>
                <div className="sm:flex flex-row md:flex items-center ml-5">
                  <Reactions
                    key={comment.date}
                    reactions={comment.reactions}
                    issuenumber={issuenumber}
                    username={username}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>{comments[0].toString()}</div>
          )}
          <div className="flex justify-center mb-10 mt-10">
            <Button className="hover:bg-[#9aae8e] dark:hover:bg-[#818CF8] dark:hover:text-white">
              <Link href = {`https://github.com/${username}/${REPO_NAME}/issues/${issuenumber}#issuecomment-new`} />
              Leave a new comment
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PostComments;