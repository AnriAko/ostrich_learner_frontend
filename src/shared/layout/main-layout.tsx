import Header from "../components/header";
import Footer from "../components/footer";
import { ReactNode } from "react";
import { useUser } from "../hooks/use-user";
import { Theme } from "../../features/userConfig/types/theme";

const MainLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();
    const isDark = user?.theme === Theme.dark;

    const bgClass = isDark
        ? "bg-gray-800 text-gray-200"
        : "bg-gray-200 text-gray-900";

    return (
        <div className={`min-h-screen flex flex-col font-ibm-plex ${bgClass}`}>
            <Header />
            <main className="flex-1 container mx-auto w-full">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
