import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { Wrap, WrapItem } from "@chakra-ui/react";

import { client } from "../lib/client";
import { Article } from "../types/article";
import { CategoryType } from "../types/category";
import Title from "../components/organisms/title";
import Category from "../components/organisms/category";
import Card from "../components/organisms/card";

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      orders: "publishedAt",
    },
  });
  const data2 = await client.get({ endpoint: "categories" });

  return {
    props: {
      articles: data.contents,
      categories: data2.contents,
    },
  };
};

type Props = {
  articles: Array<Article>;
  categories: Array<CategoryType>;
};

const Home: NextPage<Props> = ({ articles, categories }) => {
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
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
