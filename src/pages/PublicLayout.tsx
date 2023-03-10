import { Container } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Container minW={{sm: "100%", lg: "container.lg"}} p={0}>
      <Outlet />

      </Container>
    </>
  );
};

export default PublicLayout;
