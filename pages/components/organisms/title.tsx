import type { NextPage } from "next";
import { Box, Heading, Text } from "@chakra-ui/react";

const Title: NextPage = () => {
  return (
    <Box mt={50} mb={50}>
      <Heading as="h1">Sample Blog</Heading>
      <Text>おはよう世界！サンプルブログです！</Text>
    </Box>
  );
};
export default Title;
