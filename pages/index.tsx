import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Wrap, WrapItem } from "@chakra-ui/react";

import { client } from "../lib/client";
import { Article } from "../types/article";
import { CategoryType } from "../types/category";
import { Title } from "../components/organisms/title";
import { Category } from "../components/organisms/category";
import { Card } from "../components/organisms/card";
import { Pagination } from "../components/organisms/pageNation";

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      orders: "publishedAt",
      offset: 1,
      limit: 2,
    },
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
  categories: Array<CategoryType>;
};

const Home: NextPage<Props> = ({ articles, articlesCnt, categories }) => {
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

export default Home;
