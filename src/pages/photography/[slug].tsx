import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { Layout } from '../../components';
import { getPostBySlug, getAllPosts, getImagesByDirectory } from '../../lib/api';
import PhotosType from '../../types/photos';

type Props = {
  post: PhotosType;
};

function ReadingPost({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content={`${process.env.NODE_ENV === 'production' ? 'https://tywayne.com/' : '/'}${
            post.cover_img
          }`}
          key="image"
        />
      </Head>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <article className="mb-32">
          <Head>
            <title>Ty Carlson | Photography - {post.title}</title>
            <meta property="og:title" content={`Ty Carlson | Photography - ${post.title}`} />
          </Head>
          <h1 className="h2">{post.title}</h1>
          <p>{post.meta}</p>
          <div className="measure-wide"></div>

          <ul className="list">
            {post.images.map((image, indx) => {
              return (
                <li key={image.src}>
                  <Image
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    priority={indx === 0}
                    src={`/${image.src}`}
                    alt={`${post.title} - Image ${indx + 1}`}
                    layout="responsive"
                    width={image.dimensions.width}
                    height={image.dimensions.height}
                    quality={100}
                  />
                </li>
              );
            })}
          </ul>
        </article>
      )}
      <aside>
        <Link href="/photography">
          <a className="take-me-back">&larr; photos</a>
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
  const post = getPostBySlug('photography', params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'meta',
    'img_dir',
    'cover_img',
  ]);

  const images = getImagesByDirectory(post.img_dir);

  return {
    props: {
      post: {
        ...post,
        images,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts('photography', ['slug']);

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
