import Head from "next/head";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Box, Flex, Heading, Img, Stack, Text } from "@chakra-ui/react";

import { client } from "../../lib/client";
import { Article } from "../../types/article";
import { CategoryType } from "../../types/category";
import Title from "../../components/organisms/title";
import Category from "../../components/organisms/category";

type Props = {
  article: Article;
  categories: Array<CategoryType>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const data = await client.get({
    endpoint: "blogs",
    contentId: id?.toString(),
    queries: { orders: "publishedAt" },
  });
  const data2 = await client.get({ endpoint: "categories" });

  return {
    props: {
      article: data,
      categories: data2.contents,
      fallback: false,
    },
  };
};

const ArticleId: NextPage<Props> = ({ article, categories }) => {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content="Sample Blog" />
      </Head>

      <Title />
      <Box maxW="2xl" bg="white" m="0 auto" p={10}>
        <Stack textAlign="center">
          <Heading as="h2" size="md">
            {article.title}
          </Heading>
          <Flex justify="center">
            <Text mr={4}>{article.updatedAt.substring(0, 10)}</Text>
            <Text>{article.category.name}</Text>
          </Flex>
          <Img src={article.eyecatch.url} />
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </Stack>
      </Box>
      <Category categories={categories} />
    </>
  );
};

export default ArticleId;
