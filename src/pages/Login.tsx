import {
  Container,
  HStack,
  Text,
  VStack,
  useToast,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CommonInput from "../components/common/input/input";
import Formulary from "../components/Formulary";

import { auth } from "../config/firebase";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { isUserActive } = useContext(AuthContext);

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
      await signInWithEmailAndPassword(auth, user.email, user.password);
      setToast("success", "Bienvenido");

      navigate("/home");
      setLoading(false);
    } catch (err) {
      const e = err as AuthError;
      const message =
        e.code == "auth/wrong-password"
          ? "Contraseña incorrecta"
          : "Usuario no encontrado, verifique su direccion de correo";

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
      {isUserActive && (
        <Heading>Bienvenido {auth.currentUser?.displayName}!</Heading>
      )}
      {!isUserActive && (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {" "}
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
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Login;
