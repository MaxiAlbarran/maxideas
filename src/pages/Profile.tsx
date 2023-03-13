import {
  Heading,
  Container,
  Button,
  useDisclosure,
  HStack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import CommonModal from "../components/common/modal/modal";
import CommonSpinner from "../components/common/spinner/spinner";
import Post from "../components/Posts/Post";
import ProfileBox from "../components/ProfileBox";
import ProfileSettings from "../components/ProfileSettings";
import { AuthContext } from "../context/AuthContext";
import { useGetPosts } from "../hooks/Read/useGetPosts";
import { useGetUserDataById } from "../hooks/Read/useGetUserDataById";
import { useGetUserPosts } from "../hooks/Read/useGetUserPosts";

import { SettingsIcon } from "@chakra-ui/icons";

const Profile = () => {
  let { id } = useParams();

  const { user, loading } = useGetUserDataById(id!);
  const { userPosts, loadingUserPosts } = useGetUserPosts(id!);
  const { userUid } = useContext(AuthContext);

  const { isOpen, onClose, onOpen } = useDisclosure();
  
  return (
    <>
      <Container
        minW="100%"
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        alignItems={"center"}
      >
        {loading ? (
          <CommonSpinner />
        ) : (
          user && (
            <>
              <HStack
                width="100%"
                mt="6"
                mb="4"
                p={2}
                bgColor="container"
                rounded="lg"
                boxShadow="sm"
                justify="space-between"
                position="relative"
              >
                <ProfileBox
                  displayName={user?.displayName}
                  email={user?.email}
                  avatar={user?.avatar}
                  description={user?.profileDescription}
                  username={user?.username}
                />
                {userUid == id && (
                  <>
                    <Button
                      bgColor={"blue.700"}
                      transition="linear .2s"
                      _hover={{ bgColor: "blue.800" }}
                      size={{sm:"xs", md: "sm"}}
                      color="#fff"
                      onClick={() => onOpen()}
                      position="absolute"
                      top={{sm: "-1", md: "4"}}
                      right={{sm:"0", md: "5"}}
                    >
                      <SettingsIcon />
                    </Button>

                    <CommonModal
                      isOpen={isOpen}
                      onClose={onClose}
                      modalTitle="Actualizacion de perfil"
                    >
                      <ProfileSettings onClose={onClose} />
                    </CommonModal>
                  </>
                )}
              </HStack>
            </>
          )
        )}

        {loadingUserPosts && <CommonSpinner />}
        {!loadingUserPosts && !userPosts?.length && (
          <Heading fontSize="xl">Aun no hay posteos</Heading>
        )}
        {!loadingUserPosts && userPosts?.length! > 0 && (
          <VStack width="100%" bgColor="container" mb={10}>
            {userPosts!.map(
              (post, i) =>
                post.createdAt && (
                  <Post
                    text={post.text}
                    time={post.createdAt.toDate().toDateString()}
                    userRef={post.userRef}
                    image={post.image}
                    key={post.id ? post.id : i}
                    postOwner={post.userRef == userUid ? true : false}
                    documentId={post.id}
                  />
                )
            )}
          </VStack>
        )}
      </Container>
    </>
  );
};

export default Profile;
