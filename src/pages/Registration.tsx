import {
  Container,
  VStack,
  Avatar,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Box,
  Text,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";
import CommonInput from "../components/common/input/input";

const Registration = () => {
  const [show, setShow] = useState(false);

  return (
    <Container minW="100%" minH="100vh" display={"grid"} placeContent="center">
      <VStack align="center" spacing="3" mb="4">
        <Avatar size="lg" bg="blue.700" />
        <Heading size="md" textTransform={"uppercase"}>
          Registration
        </Heading>
      </VStack>
      <Box
        minW="sm"
        bgColor="lightBgColor"
        p={4}
        rounded="md"
      >
        <Flex direction={"column"} gap="10px">
            <HStack>
                <CommonInput label="Nombre" type="text"/>
                <CommonInput label="Apellido" isRequired={false} type="text"/>
            </HStack>

            <CommonInput label="Email" type="email"/>
            <CommonInput label="Contraseña" type="password"/>

        </Flex>


        <Button bgColor={"blue.700"} _hover={{ bgColor: "blue.700" }}>
          Registrate
        </Button>

      </Box>
    </Container>
  );
};

export default Registration;
