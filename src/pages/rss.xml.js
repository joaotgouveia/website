import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
    const posts = import.meta.glob('@/content/blog/*.md', { eager: true });
    let feed = [];

    for (const key in posts) {
        const post = posts[key];
        const postUrl = context.site + key.replace('/src/content/', '').replace('.md', '');

        feed.push({
            link: postUrl,
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            author: post.frontmatter.author,
            pubDate: post.frontmatter.date,
            categories: post.frontmatter.tags,
            content: sanitizeHtml(post.compiledContent(), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            }),
        });
    }

    return rss({
        stylesheet: '/rss/styles.xsl',
        title: 'joaotgouveia',
        description: 'My personal blog',
        site: context.site,
        items: feed,
    });
}
