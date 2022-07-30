import { Center, List, ListItem, Wrap } from "@chakra-ui/react";
import Link from "next/link";

export const Pagination = (props: {
  articlesCnt: number;
  currentCategory?: string;
}) => {
  console.log(props);
  const { articlesCnt, currentCategory } = props;
  //1ページあたりのページ数
  const perPage = 2;
  const pagingPath = currentCategory ? `/${currentCategory}/page` : `/page`;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((val, index) => start + index);

  return (
    <List mb="50px">
      <Wrap justify="center">
        {range(1, Math.ceil(articlesCnt / perPage)).map((val, index) => (
          <ListItem key={index}>
            <Center w="30px" h="30px" bgColor="white">
              <Link href={`${pagingPath}/${val}`}>
                <a>{val}</a>
              </Link>
            </Center>
          </ListItem>
        ))}
      </Wrap>
    </List>
  );
};
