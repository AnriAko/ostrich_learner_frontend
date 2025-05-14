import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app-router";
import { UserContextProvider } from "../shared/context/user-context-provider";

const App = () => (
    <BrowserRouter>
        <UserContextProvider>
            <AppRouter />
        </UserContextProvider>
    </BrowserRouter>
);

export default App;
