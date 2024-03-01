"use client"
import markdownStyles from "@/components/ui/markdown-styles.module.css";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {dracula, duotoneLight} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";


type Props = {
  content: string;
};


const PostBody = ({ content }: Props) => {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="py-[32px]">
      <div/>
        <Markdown
          className={currentTheme==="dark"?markdownStyles["markdowndark"]:markdownStyles["markdown"]} 
          remarkPlugins={[remarkGfm]}
          children={content}
          components={{
            code(props){
             const {children, className, node, ...rest} = props
             const match = /language-(\w+)/.exec(className || '')
             return match ? (
              <SyntaxHighlighter
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={currentTheme==="dark"?dracula:duotoneLight}
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
  );
};

export default PostBody;