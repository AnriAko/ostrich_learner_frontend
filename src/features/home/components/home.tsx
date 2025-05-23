// src/features/home/components/HomePage.tsx
import { useUser } from "../../../shared/context/user-context/use-user";
import HomeGuest from "./home-guest";
import HomeLogged from "./home-logged";

const HomePage = () => {
    const { user } = useUser();
    return user ? <HomeLogged /> : <HomeGuest />;
};

export default HomePage;
