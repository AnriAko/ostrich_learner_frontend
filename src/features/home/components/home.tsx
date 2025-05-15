// src/features/home/components/HomePage.tsx
import { Link } from "react-router-dom";
import { useUser } from "../../../shared/hooks/use-user";

const HomePage = () => {
    const { user } = useUser();
    if (!user) {
        return (
            <Link to="/signin" className="text-xl font-bold">
                Please log in
            </Link>
        );
    }

    return <h1 className="text-xl font-bold">Welcome, {user.nickname}!</h1>;
};

export default HomePage;
