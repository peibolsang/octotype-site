import { getPost } from "./api"

export const createMetadata = (user?:string) => {

    const title=user?`octotype - ${user}`: `octotype`
    return (
        {
            metadataBase: new URL('https://octotype.app'),
            title: title,
            description: 'The content discovery platform for developers',
            openGraph: {
                title: title,
                description: 'The content discovery platform for developers',
                url: 'https://octotype.app',
                siteName: title,
                images: [
                    {
                        url: 'https://octotype.app/cover.png', // Must be an absolute URL
                        width: 800,
                        height: 600,
                        alt: title
                    },
                 ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: 'The content discovery platform for developers',
                creator: '@peibolsang',
                images: ['https://octotype.app/cover.png'], // Must be an absolute URL
            },
        } 
    )
}

export const  createPostMetadata = async (user: string, slug:string) =>{
    const post = await getPost(user,slug)

    const title=post && post.title && post.content? post.title : `octotype - ${user}`
    const url = post && post.title && post.content? 
        `https://octotype.app/api/og?date=${encodeURIComponent(post.date)}&reading_time=${encodeURIComponent(post.reading_time)}&author_name${encodeURIComponent(post.author.name)}&author_picture=${encodeURIComponent(post.author.picture)}&author_html_url=${encodeURIComponent(post.author.html_url)}&title=${encodeURIComponent(post.title)}`
        :
        `https://octotype.app/cover.png`

        return (
            {
                metadataBase: new URL('https://octotype.app'),
                title: title,
                description: 'The content discovery platform for developers',
                openGraph: {
                    title: title,
                    description: 'The content discovery platform for developers',
                    url: 'https://octotype.app',
                    siteName: title,
                    images: [
                        {
                            url: url, // Must be an absolute URL
                            width: 800,
                            height: 600,
                            alt: title
                        },
                     ],
                    locale: 'en_US',
                    type: 'website',
                },
                twitter: {
                    card: 'summary_large_image',
                    title: title,
                    description: 'The content discovery platform for developers',
                    creator: '@peibolsang',
                    images: [url], // Must be an absolute URL
                },
            } 
        )
}