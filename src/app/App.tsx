import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { UserProvider } from "../contexts/UserContext";

const App = () => (
    <BrowserRouter>
        <UserProvider>
            <AppRouter />
        </UserProvider>
    </BrowserRouter>
);

export default App;
