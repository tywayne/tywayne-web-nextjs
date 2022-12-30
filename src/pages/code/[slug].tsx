import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../../components';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import CodeType from '../../types/code';

type Props = {
  post: CodeType;
};

function CodeItem({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `Ty Carlson | Code - ${post.title}`;
  const description = `${post.excerpt}`;

  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article>
          <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
          </Head>
          <h1 className="h2">{post.title}</h1>
          <a href={post.link}>&Dagger; View on Github</a>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      )}
      <aside>
        <Link href="/code" className="take-me-back">
          &larr; code
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
  const post = getPostBySlug('code', params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'excerpt',
    'link',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts('code', ['slug']);

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

export default CodeItem;
