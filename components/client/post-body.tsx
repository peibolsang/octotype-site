import markdownStyles from "@/components/ui/markdown-styles.module.css";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coldarkCold} from 'react-syntax-highlighter/dist/esm/styles/prism'


type Props = {
  content: string;
};


const PostBody = ({ content }: Props) => {
  return (
    <div className="py-[32px]">
      <div/>
        <Markdown
          className={markdownStyles["markdown"]} 
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
  );
};

export default PostBody;