import {
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import {  signOut } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {isUserActive} = useContext(AuthContext); 

  const logOut = async () => {
    try {
      await signOut(auth);

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container minW="100%">
      <Container
        maxW="container.lg"
        display={"flex"}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        py={2}
      >
        <VStack spacing={0} fontFamily={"murecho"}>
          <HStack spacing={0} fontFamily="murecho" p={0}>
            <Heading color="whiteAlpha.700">Max</Heading>
            <Heading color="red.700">Ideas</Heading>
          </HStack>
          <Text color="whiteAlpha.400" fontFamily={"murecho"} lineHeight="0.6">
            Expresate 🧠
          </Text>
        </VStack>
        {isUserActive ? (
          <>
            <Button onClick={logOut} colorScheme="red">
              Cerrar sesion
            </Button>
          </>
        ) : (
          <>
            <HStack>
              <Link to="/">
                <Button size="sm" colorScheme={"blue"}>
                  Inicia sesion
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" colorScheme={"blue"}>
                  Registrate
                </Button>
              </Link>
            </HStack>
          </>
        )}
      </Container>
    </Container>
  );
};

export default Navbar;
