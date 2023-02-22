import { Container, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import CommonInput from "../components/common/input/input";
import Formulary from "../components/Formulary";

import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const toast = useToast();
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [isUser, setIsUser] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      toast({
        title: "Bienvenido!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });

      setIsUser(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const { target } = e;

    setUser({ ...user, [target.name]: target.value });
  };

  return (
    <Container minW="100%" minH="100vh" display={"grid"} placeContent="center">
      <Formulary
        title="Login"
        buttonLabel="Login"
        onSubmit={(event) => handleSubmit(event)}
      >
        <VStack spacing="3">
          <CommonInput
            label="Email"
            type="email"
            isRequired={false}
            name="email"
            value={user.email}
            onChange={(event) => handleChange(event)}
          />
          <CommonInput
            label="Contraseña"
            type="password"
            isRequired={false}
            name="password"
            value={user.password}
            onChange={(event) => handleChange(event)}
          />
        </VStack>

        <HStack align="center" justify={"center"} py="1" my="5">
          <Text color="#999" fontSize="sm">
            Aun no tienes una cuenta?
          </Text>
          <Text
            color="blue.700"
            fontSize="md"
            _hover={{ textDecorationLine: "underline" }}
          >
            <Link to="auth">Registrate!</Link>
          </Text>
        </HStack>
      </Formulary>

      {isUser && <Navigate to="/home" />}
    </Container>
  );
};

export default Login;
