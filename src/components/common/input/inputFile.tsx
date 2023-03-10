import { HStack, Stack, Heading, Input, InputProps } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
    handleFile: Dispatch<SetStateAction<File | null | undefined>>
}

const CommonInputFile = ({handleFile}:Props) => {
  return (
      <Stack bgColor="brown" position="relative" p={2} borderRadius="lg">
        <Heading fontSize={"sm"} color="white">
          Imagen
        </Heading>
        <Input
          type="file"
          name="image"
          onChange={(e) => handleFile(e.target.files![0])}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          width="100%"
          opacity={0}
          title=""
        />
      </Stack>
  );
};

export default CommonInputFile;
