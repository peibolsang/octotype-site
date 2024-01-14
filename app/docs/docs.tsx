export const docs = 
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

- \`layou\`t: This key allows you to define the presentation of posts on your user home page. You can select from the following layouts:
    - \`minimalist\`: A streamlined table view, displaying only the date and title of each post.
    - \`grid\`: A visually appealing grid layout (2x2 on large screens and 1x1 on mobile devices), showcasing your posts as attractive cards.
    - \`magazine\`: An elegant layout option, highlighting pinned posts in a carousel format, featuring your four most recent posts as cards, and listing older posts in a traditional table format.

Example:
\`\`\`json
{
    "layout" : "magazine"
}
\`\`\`
`
