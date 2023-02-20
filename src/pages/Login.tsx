import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import CommonInput from "../components/common/input/input";

const Login = () => {

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
        <CommonInput
          label="Email"
          type="email"
        />
        <CommonInput 
          label="Contraseña"
          type="password"
        />

        <Button bgColor={"blue.700"} _hover={{ bgColor: "blue.700" }}>
          Login
        </Button>

        <HStack my="2" align="center">
          <Text color="#999" fontSize="sm">
            Aun no tienes una cuenta?
          </Text>
          <Text color="blue.700" fontSize="md">
            Registrate!
          </Text>
        </HStack>
      </Box>
    </Container>
  );
};

export default Login;
