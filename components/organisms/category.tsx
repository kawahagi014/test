import Link from "next/link";
import { Flex, List, ListItem } from "@chakra-ui/react";

import { CategoryType } from "../../types/category";

type Props = {
  categories: Array<CategoryType>;
};

export const Category = (props: Props) => {
  const { categories } = props;

  return (
    <List mt={50} mb={50}>
      <Flex justify="center">
        <ListItem _hover={{ cursor: "pointer", opacity: 0.8 }}>
          <Link href="/">
            <a>TOP</a>
          </Link>
        </ListItem>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            _before={{ content: `"・"` }}
            _hover={{ cursor: "pointer", opacity: 0.8 }}
          >
            <Link href={`/${category.id}/page/1`}>
              <a>{category.name}</a>
            </Link>
          </ListItem>
        ))}
      </Flex>
    </List>
  );
};
