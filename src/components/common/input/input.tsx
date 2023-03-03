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
  label?: string;
  isRequired?: boolean;
};

const CommonInput = ({ label, isRequired = true, ...rest }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <FormControl color="darkText" isRequired={isRequired}>
        {rest.type != "password" ? (
          <>
            <FormLabel fontSize={"lg"} fontFamily={"roboto"}>
              {label}
            </FormLabel>
            <Input
              variant="Filled"
              fontFamily={"roboto"}
              bgColor={"#f0f0f0"}
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
                variant="Filled"
                fontFamily={"roboto"}
                bgColor={"#f0f0f0"}
                _placeholder={{ color: "#999", fontFamily: "roboto" }}
                {...rest}
                type={show ? "text" : "password"}                
              />
              <InputRightElement p="0" mr="1">
                <Button
                  onClick={() => setShow(!show)}
                  bgColor="brown"
                  _hover={{ bgColor: "#652B19" }}
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
