import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = InputProps & {
  label: string;
  isRequired?: boolean;
};

const CommonInput = ({ label, isRequired = true, ...rest }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <FormControl color="darkTextColor" isRequired={isRequired}>
        {rest.type != "password" ? (
          <>
            <FormLabel fontSize={"lg"} fontFamily={"roboto"}>
              {label}
            </FormLabel>
            <Input
              variant="Filled"
              fontFamily={"roboto"}
              bgColor={"whiteAlpha.700"}
              _placeholder={{
                color: "#999",
                fontFamily: "roboto",
                fontSize: "xs",
              }}
              {...rest}
            />
          </>
        ) : (
          <>
            <FormLabel fontSize={"lg"} fontFamily={"roboto"}>
              {label}
            </FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}                
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
          </>
        )}
      </FormControl>
    </>
  );
};

export default CommonInput;
