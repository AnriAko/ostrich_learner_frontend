import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/app.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n, { i18nInitPromise } from "./shared/language/i18n.ts";

const queryClient = new QueryClient();

i18nInitPromise.then(() => {
    console.log("Rendering App with language:", i18n.language);
    createRoot(document.getElementById("root")!).render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
});
