import {
  Avatar,
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FormEvent, useContext, useState, useEffect } from "react";
import CommonInput from "../common/input/input";
import { AuthContext } from "../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import { useForm } from "../../hooks/Form/useForm";
import { useCreatePost } from "../../hooks/Create/useCreatePost";
import { useShowToast } from "../../hooks/Toast/useShowToast";
import CommonInputFile from "../common/input/inputFile";

import { AddIcon } from "@chakra-ui/icons";

type Post = {
  userRef: string | null;
  text: string;
  image: File | null;
};

type Props = {
  avatar: string | null;
  displayName: string | null;
  username: string | null;
};

const PostBox = ({ avatar, displayName, username }: Props) => {
  const { userUid } = useContext(AuthContext);

  const { form, handleChange, resetForm } = useForm<Post>({
    userRef: userUid,
    text: "",
    image: null,
  });

  const [disabled, setDisabled] = useState(true);
  const [file, setFile] = useState<File | null>();

  const createPost = useCreatePost("posts");
  const { showToast } = useShowToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isError = await createPost({
      ...form,
      image: file,
      createdAt: serverTimestamp(),
    });

    if (isError) {
      showToast({ st: "error", label: "Ha ocurrido un error!" });
    } else {
      resetForm();
      setFile(null);
      showToast({ st: "success", label: "Publicacion exitosa" });
    }
  };

  useEffect(() => {
    if (form.text.length > 0 || file) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [form.text, file]);

  return (
    <Box width="100%">
      <Flex direction="row" p={3}>
        <VStack pr={{ sm: "1", md: "2" }}>
          <Avatar
            src={avatar ? avatar : ""}
            name={displayName ? displayName : "Unknown"}
            size={{ sm: "sm", md: "md" }}
          />
        </VStack>
        <VStack align={"flex-start"} pl={0} pr={{sm:"0", md: "10", lg: "14"}} pt={2} width="100%">
          <HStack spacing={1} align="flex-start">
            <Heading size={{ sm: "xs", md: "sm" }} color="darkText" textOverflow={"ellipsis"}>
              {displayName}
            </Heading>
            <Text fontSize={{ sm: "xs", md: "sm" }} color="gray">
              @{username}
            </Text>
          </HStack>
          <VStack
            as="form"
            minW="100%"
            spacing={4}
            align="flex-start"
            onSubmit={(e) => handleSubmit(e)}
          >
            <CommonInput
              type="text"
              label="En que estas pensando?"
              placeholder="Hoy me siento genial!"
              name="text"
              value={form.text}
              onChange={(e) => handleChange(e)}
              isRequired={false}
            />
            <HStack justify={"space-between"} width="100%">
              <HStack>
                <CommonInputFile handleFile={setFile} />
                {file ? <Text>{file.name}</Text> : ""}
              </HStack>
              <IconButton
                aria-label="Make a post"
                icon={<AddIcon />}
                type="submit"
                bgColor="green"
                _hover={{ bgColor: "#22543D" }}
                size={{sm:"sm", md: "md"}}
                isDisabled={disabled}
              />
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default PostBox;
