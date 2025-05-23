// src/features/home/components/HomeGuest.tsx
import { Link } from "react-router-dom";

const HomeGuest = () => {
    return (
        <Link to="/signin" className="text-xl font-bold">
            Please log in
        </Link>
    );
};

export default HomeGuest;
