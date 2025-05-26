import { Navigate, Outlet } from "react-router-dom";
import { Theme } from "../../features/user-config/types/theme";
import { useTheme } from "../context/theme-context/use-theme";
import { useUser } from "../context/user-context/use-user";

const DashboardLayout = () => {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;
    const { user } = useUser();
    if (!user) return <Navigate to="/login" />;

    const bgClass = isDark
        ? "bg-gray-800 text-gray-200"
        : "bg-gray-100 text-gray-900";

    return (
        <div className={`flex flex-1 font-ibm-plex ${bgClass}`}>
            <main className="flex-1 p-4 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
