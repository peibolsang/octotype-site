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

const docs = 
`
# Octotype and GitHub Issues Integration
Octotype seamlessly integrates specific features from GitHub Issues into your blog posts, enhancing functionality and user experience:

- **Issues as posts**: Every GitHub issue with the \`published\` label will be available as a blog post in Octotype within the next 5 mins upon creation.
- **Labels from Issues**: Labels you assign to your issues in the octotype repository on GitHub will be automatically mirrored as post labels in Octotype.
- **Pinning Issues**: Issues you pin in GitHub Issues will also appear as pinned posts in Octotype. Note that Octotype adheres to GitHub's limitation, allowing a maximum of three pinned posts.

# Customizing Octotype
Octotype provides flexibility in configuring the appearance and layout of your user home page and individual blog posts.

## Initial Setup
Begin customizing Octotype by creating a \`config.json\` file in the root directory of your \`[user]/octotype\` repository on GitHub.

## Configuration Options
Within your \`config.json\`, you have several keys to tailor the display of your posts:

- \`layout\`: This key allows you to define the presentation of posts on your user home page. You can select from the following layouts:
    - \`minimalist\`: A streamlined table view, displaying only the date and title of each post.
    - \`grid\`: A visually appealing grid layout (2x2 on large screens and 1x1 on mobile devices), showcasing your posts as attractive cards.
    - \`magazine\`: An elegant layout option, highlighting pinned posts in a carousel format, featuring your four most recent posts as cards, and listing older posts in a traditional table format.

Note that changes in this configuration file will take 5 minutes to take effect, per GitHub's raw content cache rules.

Example:
\`\`\`json
{
    "layout" : "magazine"
}
\`\`\`
`

export const Docs = () => {


    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);
  
    const { systemTheme, theme, setTheme } = useTheme();
  
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;
  

    return(
        <Container>
          <Section>
            <Markdown
                className={currentTheme==="dark"?markdownStyles["markdowndark"]:markdownStyles["markdown"]} 
                remarkPlugins={[remarkGfm]}
                children={docs}
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
          </Section>
        </Container>
    )
}
