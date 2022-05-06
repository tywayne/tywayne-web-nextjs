import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import readingTimeWithCount from 'reading-time';

import { Layout } from '../../components';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import PostType from '../../types/post';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article className="mb-32">
          <Head>
            <title>{post.title}</title>
          </Head>
          <h1 className="h2">{post.title}</h1>
          <p>{format(new Date(post.date), 'MMM d, Y')}</p>
          <span>
            <small>
              Read time: <strong>{Math.round(post.time.minutes)} mins</strong>
            </small>
          </span>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      )}
      <aside>
        {/* {% if page.previous or page.next %}
        <ul class="list">
          {% if page.previous %}
            <li>
              <a href="{{page.previous.url}}">&larr;  {{ page.previous.title}}</a>
              <p><small>{{ page.previous.date | date: "%b %d, %Y"}}</small></p>
            </li>
          {% endif %}
          {% if page.next %}
          <li>
            <a href="{{page.next.url}}">{{ page.next.title}} &rarr;</a>
            <p><small>{{ page.next.date | date: "%b %d, %Y"}}</small></p>
          </li>
          {% endif %}
        </ul>
        {% endif %} */}
        <Link href="/blog">
          <a className="take-me-back">&larr; Blog</a>
        </Link>
      </aside>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'author', 'content']);
  const time = readingTimeWithCount(post.content);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
        time,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
