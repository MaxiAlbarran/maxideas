import { Container, VStack, HStack, Text, useToast } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CommonInput from "../components/common/input/input";
import Formulary from "../components/Formulary";

import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type NewUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const Registration = () => {
  const toast = useToast();
  const [user, setUser] = useState<NewUser>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [userRegistered, setUserRegistered] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      updateProfile(newUser.user, {
        displayName: user.name + " " + user.surname,
      });

      toast({
        title: "Usuario registrado!",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 2000,
      });

      setUserRegistered(true);
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
        title="Registration"
        buttonLabel="Registrarse"
        onSubmit={(event) => handleSubmit(event)}
      >
        <VStack spacing="4">
          <HStack>
            <CommonInput
              label="Nombre"
              type="text"
              name="name"
              value={user?.name}
              onChange={(event) => handleChange(event)}
            />
            <CommonInput
              label="Apellido"
              isRequired={false}
              type="text"
              name="surname"
              value={user?.surname}
              onChange={(event) => handleChange(event)}
            />
          </HStack>

          <CommonInput
            label="Email"
            type="email"
            name="email"
            value={user?.email}
            onChange={(event) => handleChange(event)}
          />
          <CommonInput
            label="Contraseña"
            type="password"
            name="password"
            value={user?.password}
            onChange={(event) => handleChange(event)}
            placeholder="Debe contener al menos 6 caracteres"
          />
        </VStack>

        <HStack align="center" justify={"center"} py="1" my="5">
          <Text color="#999" fontSize="sm">
            Ya tienes una cuenta?
          </Text>
          <Text
            color="blue.700"
            fontSize="md"
            _hover={{ textDecorationLine: "underline" }}
          >
            <Link to="/">Login!</Link>
          </Text>
        </HStack>
      </Formulary>

      {userRegistered && (
        <>
          <Navigate to="/" />
        </>
      )}
    </Container>
  );
};

export default Registration;
