import { Box, BoxProps, Button, Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = BoxProps & {
  title?: string;
  buttonLabel: string;
  children: ReactNode;
};

const Formulary = ({ title, buttonLabel, children, ...rest }: Props) => {
  return (
    <>
      <Flex direction={"column"} gap="10px" align="flex-start" maxW="md" minW={{sm:"100%", md: "70%", lg:"50%"}}>
        <Heading size={{sm:"md", lg: "lg"}} textAlign={"left"} color="darkText">{title}</Heading>
        <Box
          as="form"
          width={"100%"}
          bgColor="container"
          p={6}
          rounded={"2xl"}
          boxShadow="md"
          {...rest}
        >
          {children}

          <Button
            bgColor={"green"}
            _hover={{ bgColor: "#22543D" }}
            size="md"
            width="100%"
            type="submit"
          >
            {buttonLabel}
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Formulary;
