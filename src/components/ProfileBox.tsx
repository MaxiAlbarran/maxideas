import {
  Avatar,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

type Props = {
  displayName: string | null;
  avatar: string | null;
  email: string | null;
  username: string | null;
  description: string | null;
};

const ProfileBox = ({ displayName, avatar, username, description }: Props) => {
  return (
    <Box
      py={{ sm: "2", md: "4" }}
      color="darkText"
      minW="100%"
      display={"flex"}
      flexDirection="row"
    >
      <VStack pr={{sm:"1", md: "2"}}>
        <Avatar
          name={displayName ? displayName : "John Doe"}
          size={{ sm: "lg", md: "xl", lg: "2xl" }}
          src={avatar ? avatar : ""}
          bg="brown"
        />
      </VStack>
      <VStack align="flex-start" pt={{sm:"2", md: "4"}}>
        <Stack direction={{ sm: "column", md: "row" }} spacing={1}>
          <Heading fontSize={{ sm: "md", md: "xl", lg: "2xl" }}>
            {displayName}
          </Heading>
          <Text fontSize={{ sm: "sm", md: "md", lg: "xl" }} color="gray">
            @{username}
          </Text>
        </Stack>
        <Text fontWeight={400} fontSize={{sm:"sm", md: "md"}}>
          {!description ? "Aun no tienes descripcion!" : description}
        </Text>
      </VStack>
    </Box>
  );
};

export default ProfileBox;

{
  /* <HStack spacing={{sm: "2", md: "5"}}>
        <Avatar
          name={displayName ? displayName : "John Doe"}
          size={{sm:"lg", md: "xl", lg: "2xl"}}
          src={avatar ? avatar : ""}
          bg="brown"
        />
        <Stack direction={"column"} spacing={3}>
          <Stack direction={{sm:"column", md:"row"}} spacing={0}>
            <Heading fontSize={{sm:"md", md: "xl", lg: "2xl"}}>{displayName}</Heading>
            <Text fontSize="xl" color="gray">
              @{username}
            </Text>
          </Stack>
          <Text fontWeight={400}>
            {!description ? "Aun no tienes descripcion!" : description}
          </Text>
        </Stack>
      </HStack> */
}
