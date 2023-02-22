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
      <Flex direction={"column"} gap="10px" align="center">
        <Heading size="lg" textAlign={"left"} width="100%">{title}</Heading>
        <Box
          as="form"
          minW="md"
          bgColor="lightBgColor"
          p={6}
          rounded={"lg"}
          boxShadow="xl"
          {...rest}
        >
          {children}

          <Button
            bgColor={"blue.700"}
            _hover={{ bgColor: "blue.700" }}
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
