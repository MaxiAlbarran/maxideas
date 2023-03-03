import { Container, Heading, HStack, VStack } from "@chakra-ui/react";

const Banner = () => {
  return (
    <Container minW="100%" color="darkText" p={1}>
      <VStack align="flex-start">
        <HStack>
          <Heading fontSize={"3xl"}>Bienvenido a</Heading>
          <HStack spacing={0} fontFamily="murecho" p={0}>
            <Heading color="green">Max</Heading>
            <Heading color="brown">Ideas 🧠</Heading>
          </HStack>
        </HStack>
        <Heading fontSize={"3xl"}>Aqui puedes darte a conocer al mundo</Heading>
        <Heading fontSize={"3xl"}>Comparte tus ideas mediante fotos y texto!</Heading>
      </VStack>
    </Container>
  );
};

export default Banner;
