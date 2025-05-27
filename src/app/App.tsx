// src/app/app.tsx
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app-router";
import { UserContextProvider } from "../shared/context/user-context/user-context-provider";
import { ThemeContextProvider } from "../shared/context/theme-context/theme-context-provider";
import { InterfaceLanguageContextProvider } from "../shared/context/language-context/interface-language-context-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
    <BrowserRouter>
        <InterfaceLanguageContextProvider>
            <ThemeContextProvider>
                <UserContextProvider>
                    <AppRouter />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        limit={2}
                    />
                </UserContextProvider>
            </ThemeContextProvider>
        </InterfaceLanguageContextProvider>
    </BrowserRouter>
);

export default App;
