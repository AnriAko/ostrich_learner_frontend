import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import Footer from "../components/footer";
import { Theme } from "../../features/user-config/types/theme";
import { useTheme } from "../context/theme-context/use-theme";
import { useUser } from "../context/user-context/use-user";

const LOCAL_STORAGE_KEY = "sidebar:isOpen";

const MainLayout = () => {
    const { theme } = useTheme();
    const { user } = useUser();
    const isDark = theme === Theme.dark;

    const bgClass = isDark
        ? "bg-gray-800 text-gray-200"
        : "bg-gray-100 text-gray-900";

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored === null ? true : stored === "true";
    });

    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            isSidebarOpen ? "true" : "false"
        );
    }, [isSidebarOpen]);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <div className={`min-h-screen flex flex-col font-ibm-plex ${bgClass}`}>
            <Header
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div className="flex flex-1 overflow-hidden">
                {user && <Sidebar isOpen={isSidebarOpen} />}
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;
