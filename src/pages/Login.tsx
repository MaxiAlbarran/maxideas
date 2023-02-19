import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);

  return (
    <Container minW="100%" minH="100vh" display={"grid"} placeContent="center">
      <VStack align="center" spacing="3" mb="4">
        <Avatar size="lg" bg="blue.700" />
        <Heading size="md" textTransform={"uppercase"}>
          User Login
        </Heading>
      </VStack>
      <Box
        minW="sm"
        bgColor="lightBgColor"
        display={"flex"}
        flexDir="column"
        p={4}
        borderRadius={"md"}
        gap="20px"
      >
        <FormControl color="darkTextColor">
          <FormLabel fontSize={"lg"} fontFamily={"roboto"}>
            Email
          </FormLabel>
          <Input
            type="email"
            placeholder="Nunca compartiremos tu email"
            variant="Filled"
            fontFamily={"roboto"}
            bgColor={"whiteAlpha.700"}
            _placeholder={{ color: "#999", fontFamily: "roboto" }}
          />
        </FormControl>
        <FormControl color="darkTextColor">
          <FormLabel fontSize={"lg"} fontFamily={"roboto"}>
            Contraseña
          </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Solo tu la sabras"
              variant="Filled"
              fontFamily={"roboto"}
              bgColor={"whiteAlpha.700"}
              _placeholder={{ color: "#999", fontFamily: "roboto" }}
            />
            <InputRightElement p="0" mr="1">
              <Button
                onClick={() => setShow(!show)}
                bgColor="blue.700"
                color="lightTextColor"
                _hover={{ bgColor: "blue.700" }}
                size="sm"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button bgColor={"blue.700"} _hover={{bgColor:"blue.700"}}>Login</Button>

        <HStack my="2" align="center">
            <Text color="#999" fontSize="sm">Aun no tienes una cuenta?</Text>
            <Text color="blue.700" fontSize="md">Registrate!</Text>
        </HStack>
      </Box>
    </Container>
  );
};

export default Login;
