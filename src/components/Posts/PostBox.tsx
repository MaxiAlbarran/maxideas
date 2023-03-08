import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FormEvent, useContext, useState, useEffect, ChangeEvent } from "react";
import CommonInput from "../common/input/input";
import { AuthContext } from "../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import { useForm } from "../../hooks/Form/useForm";
import { useCreatePost } from "../../hooks/Create/useCreatePost";
import { useShowToast } from "../../hooks/Toast/useShowToast";
import CommonInputFile from "../common/input/inputFile";

type Post = {
  userRef: string | undefined;
  text: string;
  image: File | null;
};

type Props = {
  avatar: string | null;
  displayName: string | null;
  username: string | null;
};

const PostBox = ({ avatar, displayName, username }: Props) => {
  const { userData } = useContext(AuthContext);

  const { form, handleChange, resetForm } = useForm<Post>({
    userRef: userData?.uid,
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
      <VStack p={6} pb={3}>
        <HStack minW="100%" spacing={3}>
          <Avatar
            src={avatar ? avatar : ""}
            name={displayName ? displayName : "Unknown"}
            size="md"
          />
          <HStack spacing={1} align="flex-start">
            <Heading size="sm" color="darkText">
              {displayName}
            </Heading>
            <Text fontSize={"sm"} color="gray">
              @{username}
            </Text>
          </HStack>
        </HStack>
        <VStack
          as="form"
          minW="100%"
          px={14}
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
          <HStack>
            <CommonInputFile handleFile={setFile} />

            {file ? <Text>{file.name}</Text> : ""}
          </HStack>
          <HStack width="100%" justify="flex-end">
            <Button
              type="submit"
              bgColor="green"
              _hover={{ bgColor: "#22543D" }}
              isDisabled={disabled}
            >
              Postear
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PostBox;
