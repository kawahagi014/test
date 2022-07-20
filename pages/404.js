import Link from "next/link";
import Head from "next/head";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

import Title from "../pages/components/organisms/title";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Sample Blog</title>
        <meta name="description" content="Sample Blog" />
      </Head>

      <Title />
      <Stack>
        <Heading as="h2" size="md">
          ページが見つかりませんでした。
        </Heading>
        <Text _hover={{ cursor: "pointer", opacity: 0.8 }}>
          <Link href="/">
            <a>ホームに戻る</a>
          </Link>
        </Text>
      </Stack>
    </>
  );
}
