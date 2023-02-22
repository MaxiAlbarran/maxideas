import {
  Container,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonInput from "../components/common/input/input";
import Formulary from "../components/Formulary";

import { auth } from "../config/firebase";
import {
  AuthError,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

type NewUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

const Registration = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<NewUser>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const setToast = (st: string, message: string) => {
    toast({
      title: message,
      status: st == "error" ? "error" : "success",
      isClosable: true,
      position: "top",
      duration: 2000,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newUser = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      updateProfile(newUser.user, {
        displayName: user.name + " " + user.surname,
      });

      setToast("success", "Registro exitoso!");

      navigate("/");
    } catch (err) {
      const e = err as AuthError;
      const message =
        e.code == "auth/weak-password"
          ? "La contraseña debe contener al menos 6 caracteres"
          : "Direccion de correo electronico en uso";

      setToast("error", message);
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const { target } = e;

    setUser({ ...user, [target.name]: target.value });
  };

  return (
    <Container minW="100%" minH="100vh" display={"grid"} placeContent="center">
      {loading ? (
        <Spinner />
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default Registration;
