import { NextPage } from "next";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Article } from "../../types/article";

type Props = {
  article: Article;
};

const Card: NextPage<Props> = (props) => {
  const { article } = props;

  return (
    <Box
      maxW="300px"
      h="400px"
      bg="#e5f3ec"
      p={4}
      pt={0}
      m={3}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack textAlign="left">
        <Flex h="300px" align="center">
          <Img src={article.eyecatch.url} />
        </Flex>
        <Heading as="h2" size="s">
          {article.title}
        </Heading>
        <Divider size="2" opacity="1" />
        <Flex fontSize="xs">
          <Text mr={4}>{article.updatedAt.substring(0, 10)}</Text>
          <Text>{article.category.name}</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Card;
