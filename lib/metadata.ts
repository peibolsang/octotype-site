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