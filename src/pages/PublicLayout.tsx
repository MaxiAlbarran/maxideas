import { Container, Heading, HStack } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/navbar";
import CommonSpinner from "../components/common/spinner/spinner";
import { AuthContext } from "../context/AuthContext";

const PublicLayout = () => {
  const { userUid, loadingUser } = useContext(AuthContext);

  console.log(loadingUser, userUid);

  return (
    <Container minW={{ sm: "100%", lg: "container.lg" }} p={0}>
      {loadingUser ? (
        <HStack spacing={0} fontFamily="murecho" p={0} margin="15px">
          <Heading color="green" fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}>
            Max
          </Heading>
          <Heading color="brown" fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}>
            Ideas 🧠
          </Heading>
          <CommonSpinner />
        </HStack>
      ) : userUid ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </Container>
  );
};

export default PublicLayout;
