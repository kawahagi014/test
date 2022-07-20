import Link from "next/link";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Wrap, WrapItem } from "@chakra-ui/react";

import { client } from "../../pages/api/client";
import { Article } from "../../types/article";
import { CategoryType } from "../../types/category";
import Category from "../components/organisms/category";
import Title from "../components/organisms/title";
import Card from "../components/organisms/card";

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const paths = data.contents.map((content: any) => `/category/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      orders: "publishedAt",
      filters: `category[equals]${id}`,
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
    </>
  );
};

export default Home;
