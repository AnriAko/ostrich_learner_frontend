import { Navigate } from "react-router-dom";
import { useUser } from "../../../shared/context/user-context/use-user";

const HomePage = () => {
    const { user } = useUser();
    if (!user) return <Navigate to="/login" />;
    if (user) return <Navigate to="/dashboard" />;
};

export default HomePage;
