
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import markdownStyles from "@/components/ui/markdown-styles.module.css";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coldarkCold} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { about } from "./about";

export default function Page() {
    
    return (
        <Container>
          <Section>
            <Markdown
                className={markdownStyles["markdown"]} 
                remarkPlugins={[remarkGfm]}
                children={about}
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
          </Section>
        </Container>
    );
  }