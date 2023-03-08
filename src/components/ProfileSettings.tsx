import {
  Heading,
  HStack,
  Box,
  Flex,
  Container,
  Stack,
  Button,
  VStack,
  Text
} from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/Form/useForm";
import { useShowToast } from "../hooks/Toast/useShowToast";
import { useUpdateUser } from "../hooks/Update/useUpdateUser";
import CommonInput from "./common/input/input";
import CommonInputFile from "./common/input/inputFile";

type Form = {
  profileDescription: string;
  username: string;
  displayName: string;
};

type Props = {
  onClose: () => void;
};

const ProfileSettings = ({ onClose }: Props) => {
  const { form, handleChange } = useForm<Form>({
    displayName: "",
    username: "",
    profileDescription: "",
  });

  const { userData } = useContext(AuthContext);

  const { updateUser } = useUpdateUser(userData!);

  const { showToast } = useShowToast();

  const [isDisabled, setIsDisabled] = useState(true);
  const [file, setFile] = useState<File | null | undefined>();

  const showOptions = (title: string, name: string, value: string) => {
    return (
      <>
        <Box>
          <Flex direction="column">
            <Heading fontSize="lg">{title}</Heading>
            <HStack spacing={4} align="flex-end">
              <CommonInput
                placeholder={`Nuevo ${title}`}
                type="text"
                isRequired={false}
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
              />
            </HStack>
          </Flex>
        </Box>
      </>
    );
  };

  const inputFields = [
    {
      label: "Nombre de usuario",
      value: form.username,
      name: "username",
    },
    {
      label: "Nombre a mostrar",
      value: form.displayName,
      name: "displayName",
    },
    {
      label: "Descripcion",
      value: form.profileDescription,
      name: "profileDescription",
    },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const isError = updateUser({
      avatar: file,
      displayName: form.displayName,
      profileDescription: form.profileDescription,
      username: form.username,
    });

    isError.then((e) => {
      e
        ? showToast({ st: "warning", label: "Ha ocurrido un error" })
        : showToast({
            st: "info",
            label: "Se ha actualizado el perfil correctamente",
          });
      onClose(); //Cierra el modal
    });
  };

  useEffect(() => {
    const sum =
      form.displayName.length +
      form.profileDescription.length +
      form.username.length

    if (file || sum > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

  }, [form, file]);

  return (
    <Container
      bgColor="container"
      p={4}
      minW="100%"
      rounded={"md"}
      as="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Flex flexDir="column" gap={"20px"}>
        <VStack align={"flex-start"}>
          <Heading fontSize={"lg"}>Avatar</Heading>
          <HStack>
          <CommonInputFile handleFile={setFile} />
          {file ? <Text>{file.name}</Text> : ""}
          </HStack>
        </VStack>
        {inputFields.map((row, i) => (
          <Stack key={i}>{showOptions(row.label, row.name, row.value)}</Stack>
        ))}
      </Flex>

      <Button
        bgColor="green"
        float="right"
        mt={10}
        _hover={{ bgColor: "#22543D" }}
        type="submit"
        isDisabled={isDisabled}
      >
        Actualizar
      </Button>
    </Container>
  );
};

export default ProfileSettings;
