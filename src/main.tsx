import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./contexts/JWTContext";
import { LanguageProvider } from "./contexts/I18nContext.tsx";

import App from "./App.tsx";

// globals
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
