import {
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Show,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";
import { useGetUserDataById } from "../../../hooks/Read/useGetUserDataById";

import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const navigate = useNavigate();

  const { userUid } = useContext(AuthContext);

  const { user, loading } = useGetUserDataById(userUid);

  const logOut = async () => {
    try {
      await signOut(auth);

      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  if (userUid) {
    return (
      <Container
        maxW={{sm: "100%", lg: "container.lg"}}
        display={"flex"}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        py={2}
      >
        <VStack spacing={0}>
          <Link to="/">
            <HStack spacing={0} fontFamily="murecho" p={0}>
              <Heading color="green" fontSize={{ sm: "md", md: "lg", lg: "3xl" }}>
                Max
              </Heading>
              <Heading color="brown" fontSize={{ sm: "md", md: "lg", lg: "3xl" }}>
                Ideas
              </Heading>
            </HStack>
          </Link>
          <Show breakpoint="(min-width: 700px)">
            <Text
              color="darkText"
              fontFamily={"murecho"}
              lineHeight="0.6"
              fontSize={{ sm: "xs", md: "md", lg: "xl" }}
            >
              Expresate 🧠
            </Text>
          </Show>
        </VStack>

        <Menu>
          <MenuButton bgColor={"container"} p={1} borderRadius={"md"}>
            <HStack>
              <Avatar size="sm" src={user?.avatar} name={user?.displayName} />
              <Show breakpoint="(min-width: 700px)">
              <Heading size="xs" color="darkText">
                {user?.displayName} 
              </Heading>
              </Show>
              <ChevronDownIcon boxSize={"5"} color="#000"/>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={`/`}>
              Inicio
            </MenuItem>
            <MenuItem as={Link} to={`user/${userUid}`}>
              Mi perfil
            </MenuItem>
            <MenuDivider />
            <MenuItem
              transition=".1s linear"
              onClick={logOut}
              _hover={{ color: "red.700" }}
            >
              Cerrar sesion
            </MenuItem>
          </MenuList>
        </Menu>
      </Container>
    );
  } else {
    return <></>;
  }
};

export default Navbar;
