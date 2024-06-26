import rss from '@astrojs/rss';
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import { parse as htmlParser } from "node-html-parser";

export async function getStaticPaths() {
    const posts = await getCollection("blog");
    let tags = [];

    for (let i = 0; i < posts.length; i++) {
        tags = [...tags, ...posts[i].data.tags];
    }

    tags = [...(new Set(tags))];

    return tags.map((tag) => ({
        params: { tag: tag.toLowerCase().replaceAll(' ', '-') },
    }));
}

export async function GET(context) {
    const { params } = context;
    const posts = import.meta.glob('@/content/blog/*.md', { eager: true });
    let feed = [];

    for (const key in posts) {
        const post = posts[key];
        if (post.frontmatter.tags.map(tag => tag.toLowerCase().replaceAll(' ', '-')).includes(params.tag)) {
            const postUrl = context.site + key.replace('/src/content/', '').replace('.md', '');
            const postBody = post.compiledContent();
            const postHtml = htmlParser.parse(postBody);
            const postImages = postHtml.querySelectorAll("img");

            for (const image of postImages) {
                const src = image.getAttribute("src");
                image.setAttribute("src", context.site + src.replace("/", ""),);
            }

            feed.push({
                link: postUrl,
                title: post.frontmatter.title,
                description: post.frontmatter.description,
                author: post.frontmatter.author,
                pubDate: post.frontmatter.date,
                categories: post.frontmatter.tags,
                content: sanitizeHtml(postHtml.toString(), {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
                }),
            });
        }
    }

    return rss({
        stylesheet: '/rss/styles.xsl',
        title: `joaotgouveia's ${params.tag} posts`,
        description: `My blog posts tagged with ${params.tag}`,
        site: context.site,
        items: feed,
    });
}
