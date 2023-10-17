import {
  type GetStaticPropsContext,
  type GetStaticPaths,
  type GetStaticPathsResult,
  type InferGetStaticPropsType,
} from "next";

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import superJSON from "superjson";

// import { db } from "@/server/db";
import { api } from "@/utils/api";
import { MDXRemote } from "next-mdx-remote";
import { MakeMeRed } from "@/components/mdx/MakeMeRed";

type PageParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths =
  (): GetStaticPathsResult<PageParams> => {
    return {
      paths: [{ params: { slug: "juste-un-test" }, locale: "fr" }],
      fallback: "blocking",
    };
  };

export async function getStaticProps(ctx: GetStaticPropsContext<PageParams>) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      // db
    },
    transformer: superJSON,
  });
  const slug = ctx.params?.slug;

  if (!slug)
    return {
      notFound: true,
    };

  const locale = ctx.locale ?? ctx.defaultLocale ?? "fr";

  await helpers.article.articleContent.prefetch({
    slug,
    locale: ctx.locale ?? "fr",
  });

  return {
    props: {
      slug,
      locale,
      trpcState: helpers.dehydrate(),
    },
    revalidate: 1,
  };
}

export default function ArticlePage({
  slug,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const postQuery = api.article.articleContent.useQuery({ slug, locale });
  const { data } = postQuery;

  console.log({ data });
  return (
    <main>
      {data ? <MDXRemote {...data} components={{ MakeMeRed }} /> : <p>Lol</p>}
    </main>
  );
}
