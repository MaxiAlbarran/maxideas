import { Container } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/navbar";
import { AuthContext } from "../context/AuthContext";

const PublicLayout = () => {
  const { userUid } = useContext(AuthContext);
  return userUid ? (
    <>
      <Navbar />
      <Container minW={{ sm: "100%", lg: "container.lg" }} p={0}>
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PublicLayout;
