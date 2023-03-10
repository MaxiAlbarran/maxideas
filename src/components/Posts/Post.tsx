import {
  Avatar,
  Box,
  Image,
  Heading,
  HStack,
  VStack,
  Text,
  Flex,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetUserDataById } from "../../hooks/Read/useGetUserDataById";

import { DeleteIcon } from "@chakra-ui/icons";
import { useDeletePost } from "../../hooks/Delete/useDeletePost";
import { useShowToast } from "../../hooks/Toast/useShowToast";

type Props = {
  text: string;
  image?: string;
  time: string;
  userRef: string;
  postOwner: boolean;
  documentId: string;
};

const Post = ({ text, image, time, userRef, postOwner, documentId }: Props) => {
  const { user } = useGetUserDataById(userRef);
  const { showToast } = useShowToast();

  const isImage = image?.length! > 5 ? true : false;
  const deletePost = useDeletePost(documentId, isImage);

  const handleClick = () => {
    const isError = deletePost();

    isError.then(err => {
      err? showToast({ st: "error", label: "Ha ocurrido un error" })
      : showToast({ st: "success", label: "Publicacion eliminada" });
    })
  };

  return (
    <Box minW="100%">
      <Flex direction="row" px={3} py={3} position="relative">
        <VStack pr={{sm: "1", md: "2"}}>
          <Avatar
            as={Link}
            to={`/user/${userRef}`}
            name={user?.displayName}
            src={user?.avatar}
            size={{ sm: "sm", md: "md" }}
          />
        </VStack>

        <VStack align="flex-start" pt={0} spacing={0}>
          <Stack direction={{sm: "column", md: "row"}} spacing={1}>
            <HStack as={Link} to={`/user/${userRef}`} spacing="0.5">
              <Heading fontSize={{ sm: "xs", md: "sm" }} fontWeight="bold" textOverflow={"ellipsis"}>
                {user?.displayName}
              </Heading>
              <Text color="gray" fontSize={{ sm: "xs", md: "sm" }}>@{user?.username}</Text>
            </HStack>
            <Text fontSize={{ sm: "xs", md: "sm" }} color="gray.500">
              {" "}
              ~ {time}
            </Text>
          </Stack>

          <Text pt={2} pb={3} fontSize={{sm: "sm", md: "md"}}>
            {text}
          </Text>
          {isImage && (
            <Image src={image} alt={text} maxW={{sm: "100%", md:"80%"}} borderRadius={"lg"} />
          )}
        </VStack>
        {postOwner && (
          <IconButton
            aria-label="Delete post"
            icon={<DeleteIcon />}
            bgColor="red.500"
            _hover={{ bgColor: "red.600" }}
            position="absolute"
            top={{sm: "-1", md: "4"}}
            right={{sm:"0", md: "5"}}
            onClick={handleClick}
            size={{sm:"xs", md: "sm"}}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Post;
