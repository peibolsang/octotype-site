"use client"
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import markdownStyles from "@/components/ui/markdown-styles.module.css";
import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {dracula, duotoneLight} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const about = 
`
# What is Octotype?
Octotype is an innovative blogging platform that uniquely utilizes GitHub Issues as a headless CMS. 
Our core philosophy emphasizes the importance of content ownership. Hence, Octotype exclusively manages the reading experience, transforming your GitHub issues into visually appealing, responsive, and user-friendly blog posts.

## Writing Experience
Octotype deliberately does not offer a direct blogging interface. Our focus is not on controlling the writing process. 
Instead, we encourage you to use your preferred tools for composing issues, be it through GitHub's web interface, GitHub Desktop, or the GitHub CLI. 
This approach ensures that you retain full control over the creation and management of your content.

# Getting Started with Octotype
Using Octotype is straightforward and involves just a few simple steps:

1. **Repository Creation**: Set up a new repository named \`[user]/octotype\` on GitHub.
2. **Issue Publishing**: Within this repository, create an issue. To designate it as a blog post, simply add the \`published\` label to it.
3. **Sharing Your Content**: Your blog posts are now ready to be shared with the world via \`octotype.app/[user]\`.

# Technical Insights
Octotype is built using Next.js and hosted on Vercel. It functions by reading data from GitHub's public API. 
Significantly, Octotype does not require any authentication or authorization to interact with GitHub repositories. 
This design choice ensures a secure and hassle-free experience for publishing your stories on Octotype.
`

export const About = () => {


    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
  
    const { systemTheme, theme, setTheme } = useTheme();
  
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
  

    return (
        <Container>
            <Section>
              <Markdown
                  className={currentTheme==="dark"?markdownStyles["markdowndark"]:markdownStyles["markdown"]} 
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
                          style={currentTheme==="dark"?dracula:duotoneLight}
                      />
                      ) : (
                      <code {...rest} className={className}>
                          {children}
                      </code>
                      );
                      }
                  }
                  }
              />
            </Section>
        </Container>
    );
}