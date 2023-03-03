import {
  Avatar,
  Box,
  Image,
  Heading,
  HStack,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useGetUserDataById } from "../../hooks/Read/useGetUserDataById";

type Props = {
  text: string;
  image?: string;
  time: string;
  userRef: string;
};

const Post = ({ text, image, time, userRef }: Props) => {

 const {user, loading} = useGetUserDataById(userRef)

  return (
    <Box mb={2} borderTop="solid 1px #CBD5E0" width="100%">
      <Flex direction="row" px={3} pt={3}>
        <VStack pr={2}>
          <Avatar name={user?.displayName} src={user?.avatar} size="md" />
        </VStack>
        <VStack align="flex-start" pt={2} spacing={0}>
          <HStack align="center" spacing={1}>
            <Heading fontSize={"md"} fontWeight="bold">
              {user?.displayName}
            </Heading>
            <Text color="gray">
              @{user?.username}
            </Text>
            <Text fontSize={"sm"} color="gray.500">
              {" "}
              ~ {time}
            </Text>
          </HStack>
          <Text pt={2} pb={3}>
            {text}
          </Text>
          {image && image?.length > 1 && (
            <Image src={image} alt={text} maxW="80%" borderRadius={"lg"} />
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Post;
