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
        <article>
          <Head>
            <title>Ty Carlson | {post.title}</title>
            <meta property="og:title" content={`Ty Carlson | ${post.title}`} />
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
        <Link href="/blog">
          <a className="take-me-back">&larr; blog</a>
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
  const post = getPostBySlug('posts', params.slug, ['title', 'date', 'slug', 'author', 'content']);
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
  const posts = getAllPosts('posts', ['slug']);

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
