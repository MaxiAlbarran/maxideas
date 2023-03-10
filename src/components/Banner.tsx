import { Container, Heading, HStack, VStack } from "@chakra-ui/react";

const Banner = () => {
  return (
    <Container minW="100%" color="darkText" p={1} mb="12">
      <VStack align="flex-start">
        <HStack>
          <Heading fontSize={{sm:"xl", md: "2xl", lg:"3xl"}}>Bienvenido a</Heading>
          <HStack spacing={0} fontFamily="murecho" p={0} >
            <Heading color="green" fontSize={{sm:"xl", md: "2xl", lg:"3xl"}}>Max</Heading>
            <Heading color="brown" fontSize={{sm:"xl", md: "2xl", lg:"3xl"}}>Ideas 🧠</Heading>
          </HStack>
        </HStack>
        <Heading fontSize={{sm:"xl", md: "2xl", lg:"3xl"}}>Aqui puedes darte a conocer al mundo</Heading>
        <Heading fontSize={{sm:"xl", md: "2xl", lg:"3xl"}}>Comparte tus ideas mediante fotos y texto!</Heading>
      </VStack>
    </Container>
  );
};

export default Banner;
