import { Button, Container, Flex, Heading, HStack, useDisclosure, VStack } from "@chakra-ui/react";

import { useContext } from "react";
import CommonSpinner from "../components/common/spinner/spinner";
import CommonModal from "../components/common/modal/modal";
import Post from "../components/Posts/Post";
import PostBox from "../components/Posts/PostBox";
import ProfileBox from "../components/ProfileBox";
import { AuthContext } from "../context/AuthContext";
import { useGetPosts } from "../hooks/Read/useGetPosts";
import { useGetUserDataById } from "../hooks/Read/useGetUserDataById";
import ProfileSettings from "../components/ProfileSettings";

const Home = () => {
  const { userData } = useContext(AuthContext);

  const { user , loading } = useGetUserDataById(userData?.uid);
  const { posts } = useGetPosts();

  const {onOpen, onClose, isOpen} = useDisclosure()
  return (
    <Container
      minW="container.lg"
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
    >
      {user &&
        (loading ? (
          <CommonSpinner />
        ) : (
          <>
            <Flex
              width="100%"
              mt="6"
              direction={"column"}
              py={2}
              px={2}
              boxShadow="sm"
              rounded={"lg"}
              bgColor="container"
              mb="4"
            >
              <HStack
                align="center"
                justify={loading ? "center" : "space-between"}
              >
                {loading ? (
                  <CommonSpinner />
                ) : (
                  <>
                    {" "}
                    <ProfileBox
                      displayName={user?.displayName}
                      email={user?.email}
                      avatar={user?.avatar}
                      description={user?.profileDescription}
                      username={user?.username}
                    />
                    <Button
                      bgColor={"blue.700"}
                      transition="linear .2s"
                      _hover={{ bgColor: "blue.800" }}
                      size="sm"
                      color="#fff"
                      onClick={()=> onOpen()}
                    >
                      Editar perfil
                    </Button>

                    <CommonModal isOpen={isOpen} onClose={onClose} modalTitle="Actualizacion de perfil">
                      <ProfileSettings onClose={onClose}/>
                    </CommonModal>
                  </>
                )}
              </HStack>
            </Flex>

            <Flex width="100%" bgColor="container">
              <PostBox
                avatar={user?.avatar}
                displayName={user?.displayName}
                username={user?.username}
              />
            </Flex>

            <VStack width="100%" bgColor="container" mb={10}>
              {posts &&
                posts?.length &&
                posts.map(
                  (post, i) =>
                    post.createdAt && (
                      <Post
                        text={post.text}
                        time={post.createdAt.toDate().toDateString()}
                        userRef={post.userRef}
                        image={post.image}
                        key={post.id? post.id : i}
                      />
                    )
                )}
            </VStack>
          </>
        ))}
    </Container>
  );
};

export default Home;
