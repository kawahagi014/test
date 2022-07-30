import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Wrap, WrapItem } from "@chakra-ui/react";

import { client } from "../../../lib/client";
import { Article } from "../../../types/article";
import { CategoryType } from "../../../types/category";
import { Title } from "../../../components/organisms/title";
import { Category } from "../../../components/organisms/category";
import { Card } from "../../../components/organisms/card";
import { Pagination } from "../../../components/organisms/pageNation";

//1ページあたりのページ数
const perPage = 2;

export const getAllCategoryPagePaths = async () => {
  const resCategory = await client.get({
    endpoint: "categories",
  });

  const paths: string[] = await Promise.all(
    resCategory.contents.map((item: any) => {
      const result = client
        .get({
          endpoint: "blogs",
          queries: {
            filters: `category[equals]${item.id}`,
          },
        })
        .then(({ totalCount }) => {
          const range = (start: number, end: number) =>
            [...Array(end - start + 1)].map((_, i) => start + i);

          return range(1, Math.ceil(totalCount / perPage)).map(
            (val) => `/${item.id}/page/${val}`
          );
        });
      return result;
    })
  );

  return paths.flat();
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryPagePaths();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.id);
  const currentCategory = context.params?.category;
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      offset: (id - 1) * perPage,
      limit: perPage,
      filters: `category[equals]${currentCategory}`,
    },
  });
  const data2 = await client.get({ endpoint: "categories" });

  return {
    props: {
      articles: data.contents,
      articlesCnt: data.totalCount,
      currentCategory: currentCategory,
      categories: data2.contents,
    },
  };
};

type Props = {
  articles: Array<Article>;
  articlesCnt: number;
  currentCategory: string;
  categories: Array<CategoryType>;
};

const CategoryPage: NextPage<Props> = ({
  articles,
  articlesCnt,
  currentCategory,
  categories,
}) => {
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
        <Pagination
          articlesCnt={articlesCnt}
          currentCategory={currentCategory}
        />
      </main>

      <footer></footer>
    </>
  );
};

export default CategoryPage;
