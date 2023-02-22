import { Container, Heading } from "@chakra-ui/react";
import { auth } from "../config/firebase";

const Home = () => {
  return (
    <Container>
      <Heading>Bienvenido {auth.currentUser?.displayName} !</Heading>
    </Container>
  );
};

export default Home;
