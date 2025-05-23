// src/features/home/components/HomeLogged.tsx
import { useUser } from "../../../shared/context/user-context/use-user";

const HomeLogged = () => {
    const { user } = useUser();

    return (
        <h1 className="text-xl font-bold p-3 pl-9 pr-9">
            Welcome, {user?.nickname}!
        </h1>
    );
};

export default HomeLogged;
