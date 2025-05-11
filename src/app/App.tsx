import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { UserProvider } from "../shared/context/UserProvider";

const App = () => (
    <BrowserRouter>
        <UserProvider>
            <AppRouter />
        </UserProvider>
    </BrowserRouter>
);

export default App;
