/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./locales/index.js";
import { AuthenticationContext } from "./context/AuthenticationContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LangSelect } from "./ui/LangSelect.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 10,
      notifyOnChangeProps: "all",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticationContext>
      <QueryClientProvider client={queryClient}>
        <LangSelect />

        <ReactQueryDevtools initialIsOpen={false} />
        {/* STYLES KLASÖRÜ ALTINDA TANIMLANAN GLOBALSTYLES DOSYASI İÇERİSİNDEKİ DEĞERLERİN KULLANILABİLMESİ İÇİN SELF-CLOSING TAG İLE BURAYA IMPORT EDİLDİ */}
        <GlobalStyles />

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthenticationContext>
  </React.StrictMode>
);
