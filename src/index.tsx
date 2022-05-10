import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import "antd/dist/antd.min.css";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import theme from "assets/theme";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </RecoilRoot>
);
