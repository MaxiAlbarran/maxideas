import { Heading, Container, VStack, Text, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Catch = () => {
  const { userUid } = useContext(AuthContext);
  return (
    <Container margin="100px auto">
      <VStack p={4} align="flex-start" spacing={4}>
        <Heading fontSize={"6xl"} fontFamily="murecho" fontWeight={"bold"}>
          404{" "}
        </Heading>
        <Text fontSize="2xl" fontWeight={"bold"} fontFamily="murecho">
          Oops! Pagina no encontrada 😕
        </Text>
        <Text fontSize="lg">
          La pagina que estas buscando no existe, ha sido removida o se no se
          encuentra disponible por ahora
        </Text>
        <Link to={userUid ? "home" : "/"}>
          <Button size="md" colorScheme={"blue"}>
            Ve al inicio
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default Catch;
