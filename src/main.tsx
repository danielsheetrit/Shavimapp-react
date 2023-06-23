import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./contexts/JWTContext";
import { LanguageProvider } from "./contexts/I18nContext.tsx";

import App from "./App.tsx";

// globals
import "./globals.css";
import { SettingsProvider } from "./contexts/SettingsContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </LanguageProvider>
    </AuthProvider>
  </React.StrictMode>
);
