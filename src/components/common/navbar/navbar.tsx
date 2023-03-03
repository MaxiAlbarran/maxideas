import {
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

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
          <Link to="/home">
            <HStack spacing={0} fontFamily="murecho" p={0}>
              <Heading color="green">Max</Heading>
              <Heading color="brown">Ideas</Heading>
            </HStack>
          </Link>
          <Text color="darkText" fontFamily={"murecho"} lineHeight="0.6">
            Expresate 🧠
          </Text>
        </VStack>
        {userData ? (
          <>
            <Button onClick={logOut} bgColor="red.600" size="sm" _hover={{bgColor:"red.700"}}>
              Cerrar sesion
            </Button>
          </>
        ) : (
          <>
            <HStack>
              <Link to="/">
                <Button size="sm" bgColor="blue.700" _hover={{bgColor:"blue.800"}}>
                  Inicia sesion
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" bgColor="blue.700" _hover={{bgColor:"blue.800"}}>
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
