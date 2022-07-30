import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Wrap, WrapItem } from "@chakra-ui/react";

import { client } from "../../lib/client";
import { Article } from "../../types/article";
import { CategoryType } from "../../types/category";
import { Title } from "../../components/organisms/title";
import { Category } from "../../components/organisms/category";
import { Card } from "../../components/organisms/card";
import { Pagination } from "../../components/organisms/pageNation";

//1ページあたりのページ数
const perPage = 2;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(data.totalCount / perPage)).map(
    (val) => `/page/${val}`
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.id);
  const data = await client.get({
    endpoint: "blogs",
    queries: { offset: (id - 1) * perPage, limit: perPage },
  });
  const data2 = await client.get({ endpoint: "categories" });

  return {
    props: {
      articles: data.contents,
      articlesCnt: data.totalCount,
      categories: data2.contents,
    },
  };
};

type Props = {
  articles: Array<Article>;
  articlesCnt: number;
  articlesStart: number;
  categories: Array<CategoryType>;
};

const Page: NextPage<Props> = ({ articles, articlesCnt, categories }) => {
  return (
    <>
      <Head>
        <title>Sample Blog</title>
        <meta name="description" content="Sample Blog" />
      </Head>

      <main>
        <Title />
        <Wrap justify="center">
          {articles.map((article) => (
            <Link href={`/blog/${article.id}`} key={article.id}>
              <a>
                <WrapItem>
                  <Card article={article} />
                </WrapItem>
              </a>
            </Link>
          ))}
        </Wrap>
        <Category categories={categories} />
        <Pagination articlesCnt={articlesCnt} />
      </main>

      <footer></footer>
    </>
  );
};

export default Page;
