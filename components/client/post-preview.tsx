"use client"
import Avatar from "@/components/ui/avatar";
import DateFormatter from "@/components/ui/date-formatter";
import Link from "next/link";
import {Badge} from "@/components/ui/badge"
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import type Author from "@/interfaces/author";
import markdownStyles from "@/components/ui//markdown-styles.module.css";
import LabelType from "@/interfaces/label";
import PostLabels from "@/components/client/post-labels";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coldarkCold} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: {
    number: string;
    url: string;
  };
  comments_count: string;
  reactions_count: string;
  reading_time: string;
  labels:LabelType[];
  pinned?: boolean
};

const PostPreview = ({
  title,
  date,
  excerpt,
  author,
  slug,
  comments_count,
  reactions_count,
  reading_time,
  labels,
  pinned
}: Props) => {


  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Card className={excerpt!=""? `min-h-[500px] m-4`:`min-h-[350px] m-4`} interactive>
      
            <CardHeader>
              <div className="flex items-center">
                <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl text-[0.75rem] font-medium font-mono border-none mb-4">
                  <DateFormatter dateString={date} /> · {reading_time} min
                  {reading_time === "1" ? "" : "s"} read
                </Badge>
                {
                  pinned? 
                    <Badge variant="outline" className="inline-flex items-center gap-2 w-fit py-1 px-2 bg-slate-200 dark:bg-slate-700 rounded-xl font-medium font-mono border-none mb-4 ml-2">
                      <DrawingPinFilledIcon/>
                    </Badge>:<></>
                }
              </div>
              <Avatar
                name={author.name}
                picture={author.picture}
                html_url={author.html_url}
              />
            </CardHeader>
            <CardContent>
            <Link
              href={`/${author.name}/stories/${slug.number}`}
              >
              <h3 className={excerpt!=""? `hover:underline text-3xl xl:text-4xl leading-snug font-bold` : `hover:underline text-xl xl:text-2xl leading-snug font-bold`}>
                {title}
              </h3>
            </Link>
              {
                excerpt!=""?
                <div className="line-clamp-2 md:line-clamp-2 lg:line-clamp-5">
                  <Markdown
                    className={currentTheme==="dark"?markdownStyles["markdowndark"]:markdownStyles["markdown"]} 
                    remarkPlugins={[remarkGfm]}
                    children={excerpt}
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
                      ) 
                      : 
                      (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      )
                    }
                  }
                  }
                  />
                </div>
                :
                <></>
              }
          <PostLabels labels={labels}/>
          <div className="flex items-center mt-4">
            <span className="mr-2">
              <span className="text-[0.8rem] mr-1">&#x1F4AC;</span>
              <span className="text-[0.8rem] mr-1">{comments_count}</span>
            </span>
            <span className="">
              <span className="text-[0.8rem] mr-1">&#x1F642;</span>
              <span className="text-[0.8rem] mr-1">{reactions_count}</span>
            </span>
          </div>
        </CardContent>
    </Card>
  );
};

export default PostPreview;