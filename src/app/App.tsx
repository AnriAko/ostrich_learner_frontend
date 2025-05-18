import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app-router";
import { UserContextProvider } from "../shared/context/user-context/user-context-provider";
import { ThemeContextProvider } from "../shared/context/theme-context/theme-context-provider";
import { InterfaceLanguageContextProvider } from "../shared/context/language-context/interface-language-context-provider";

const App = () => (
    <BrowserRouter>
        <InterfaceLanguageContextProvider>
            <ThemeContextProvider>
                <UserContextProvider>
                    <AppRouter />
                </UserContextProvider>
            </ThemeContextProvider>
        </InterfaceLanguageContextProvider>
    </BrowserRouter>
);

export default App;
