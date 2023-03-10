import {
  Container,
  HStack,
  Text,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CommonInput from "../components/common/input/input";
import Formulary from "../components/common/formBox/formBox";

import { auth } from "../config/firebase";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import CommonSpinner from "../components/common/spinner/spinner";
import { useForm } from "../hooks/Form/useForm";
import { useShowToast } from "../hooks/Toast/useShowToast";
import Banner from "../components/Banner";

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { showToast } = useShowToast();
  const { form, handleChange } = useForm<User>({ email: "", password: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      showToast({ st: "success", label: "Bienvenido!" });

      navigate("/home");
      setLoading(false);
    } catch (err) {
      const e = err as AuthError;
      const message =
        e.code == "auth/wrong-password"
          ? "Contraseña incorrecta"
          : "Usuario no encontrado, verifique su direccion de correo";

      showToast({ st: "error", label: message });
      setLoading(false);
    }
  };

  return (
    <Container
      minW="100%"
      display="flex"
      justifyContent={"center"}
      py="6"
      mt={{ sm: "10", lg: "24" }}
    >
      {loading ? (
        <CommonSpinner />
      ) : (
        <Flex width="100%" direction={"column"} align="center">
          <Banner />{" "}
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
                value={form.email}
                onChange={(event) => handleChange(event)}
              />
              <CommonInput
                label="Contraseña"
                type="password"
                isRequired={false}
                name="password"
                value={form.password}
                onChange={(event) => handleChange(event)}
              />
            </VStack>

            <HStack align="center" justify={"center"} py="1" my="5">
              <Text color="#999" fontSize="sm">
                No tienes una cuenta?
              </Text>
              <Text
                color="blue.800"
                fontSize="md"
                fontWeight={"bold"}
                _hover={{ textDecorationLine: "underline" }}
              >
                <Link to="auth">Registrate!</Link>
              </Text>
            </HStack>
          </Formulary>
        </Flex>
      )}
    </Container>
  );
};

export default Login;
