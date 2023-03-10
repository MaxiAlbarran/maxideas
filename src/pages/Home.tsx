import {
  Container,
  Divider,
  Flex,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { useContext } from "react";
import CommonSpinner from "../components/common/spinner/spinner";
import Post from "../components/Posts/Post";
import PostBox from "../components/Posts/PostBox";
import { AuthContext } from "../context/AuthContext";
import { useGetPosts } from "../hooks/Read/useGetPosts";
import { useGetUserDataById } from "../hooks/Read/useGetUserDataById";

const Home = () => {
  const { userUid } = useContext(AuthContext);

  const { user, loading } = useGetUserDataById(userUid);
  const { posts } = useGetPosts();
  return (
    <Container
      minW="100%"
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems={"center"}
      px={{sm:"0.5", md:"4"}}
    >
      {loading || !user ? (
        <CommonSpinner />
      ) : (
        <>
          <Flex width="100%" bgColor="container" my={6}>
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
                    <Stack key={post.id} width="100%" align="center">
                      {i > 0 && <Divider bgColor="gray" width="90%" />}
                      <Post
                        text={post.text}
                        time={post.createdAt.toDate().toDateString()}
                        userRef={post.userRef}
                        image={post.image}
                        postOwner={post.userRef == userUid ? true : false}
                        documentId={post.id}
                      />
                    </Stack>
                  )
              )}
          </VStack>
        </>
      )}
    </Container>
  );
};

export default Home;
