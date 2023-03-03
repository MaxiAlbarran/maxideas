import { Avatar, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";

type Props = {
  displayName: string | null;
  avatar: string | null;
  email: string | null;
  username: string | null;
  description: string | null;
};

const ProfileBox = ({
  displayName,
  avatar,
  username,
  description,
}: Props) => {
  return (
    <Box py={4} color="darkText">
      <HStack spacing={5}>
        <Avatar
          name={displayName ? displayName : "John Doe"}
          size="2xl"
          src={avatar ? avatar : ""}
          bg="brown"
        />
        <Stack direction={"column"} spacing={3}>
          <HStack>
            <Heading fontSize="2xl">{displayName}</Heading>
            <Text fontSize="xl" color="gray">
              @{username}
            </Text>
          </HStack>
          <Text fontWeight={400}>
            {!description ? "Aun no tienes descripcion!" : description}
          </Text>
        </Stack>
      </HStack>
    </Box>
  );
};

export default ProfileBox;
