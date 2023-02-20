import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";

import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { getRouter } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={getRouter()} />
    </ChakraProvider>
  </React.StrictMode>
);
