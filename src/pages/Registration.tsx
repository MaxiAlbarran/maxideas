import { Container, VStack, HStack, Text, Stack } from "@chakra-ui/react";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import CommonInput from "../components/common/input/input";
import CommonSpinner from "../components/common/spinner/spinner";
import Formulary from "../components/common/formBox/formBox";

import { useForm } from "../hooks/Form/useForm";
import { useCreateUser } from "../hooks/Create/useCreateUser";
import { useShowToast } from "../hooks/Toast/useShowToast";

type NewUser = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
};

const Registration = () => {
  const navigate = useNavigate();

  const { form, handleChange } = useForm<NewUser>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const { createNewUser, loading } = useCreateUser();

  const { showToast } = useShowToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newUserData = {
      email: form.email,
      password: form.password,
      displayName: form.name + " " + form.surname,
      username: form.username,
    };

    const isError = await createNewUser(newUserData);

    if (isError) {
      showToast({
        st: "error",
        label: "Registro erroneo, verifique los datos ingresados",
      });
    } else {
      showToast({
        st: "success",
        label: "Registro exitoso",
      });
      navigate("/home");
    }
  };

  return (
    <Container minW="100%" display="flex" justifyContent={"center"} py={"6"} mt={{sm: "10", lg: "24"}}>
      {loading ? (
        <CommonSpinner />
      ) : (
        <>
          <Formulary
            title="Registration"
            buttonLabel="Registrarse"
            onSubmit={(event) => handleSubmit(event)}
          >
            <VStack spacing="4">
              <Stack direction={{sm:"column", md: "row"}} width="100%">
                <CommonInput
                  label="Nombre"
                  type="text"
                  name="name"
                  value={form?.name}
                  onChange={(event) => handleChange(event)}
                />
                <CommonInput
                  label="Apellido"
                  isRequired={false}
                  type="text"
                  name="surname"
                  value={form?.surname}
                  onChange={(event) => handleChange(event)}
                />
              </Stack>

              <CommonInput
                label="Nombre de usuario"
                type="text"
                name="username"
                value={form?.username}
                onChange={(event) => handleChange(event)}
              />
              <CommonInput
                label="Email"
                type="email"
                name="email"
                value={form?.email}
                onChange={(event) => handleChange(event)}
              />
              <CommonInput
                label="Contraseña"
                type="password"
                name="password"
                value={form?.password}
                onChange={(event) => handleChange(event)}
                placeholder="De al menos 6 caracteres"
              />
            </VStack>

            <HStack align="center" justify={"center"} py="1" my="5">
              <Text color="#999" fontSize="sm">
                Ya tienes una cuenta?
              </Text>
              <Text
                color="blue.700"
                fontSize="md"
                fontWeight={"bold"}
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
