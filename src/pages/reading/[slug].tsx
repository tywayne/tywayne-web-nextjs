import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '../../components';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import ReadingType from '../../types/reading';

type Props = {
  post: ReadingType;
};

function ReadingPost({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `Ty Carlson | Reading List - ${post.title}`;
  const description = `List of books I read in ${post.title}, in chronological order.`;

  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article>
          <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
          </Head>
          <h1 className="h2">reading list &mdash; {post.title}</h1>
          <p>List of books I read in {post.title}, in chronological order.</p>

          <div className="progress">
            <progress
              id="progress"
              className="inline"
              value={post.book_count}
              max={post.goal}
            ></progress>
            <label htmlFor="progress">
              Completed {post.book_count} out of {post.goal} book goal.
            </label>
          </div>
          <div className="measure-wide">
            <div className="readingList">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      )}
      <aside>
        <Link href="/reading">
          <a className="take-me-back">&larr; reading list</a>
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
  const post = getPostBySlug('reading', params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'excerpt',
    'book_count',
    'goal',
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
  const posts = getAllPosts('reading', ['slug']);

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

export default ReadingPost;
