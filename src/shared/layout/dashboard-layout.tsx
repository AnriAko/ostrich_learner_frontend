import { Outlet } from "react-router-dom";
import { Theme } from "../../features/userConfig/types/theme";
import { useTheme } from "../context/theme-context/use-theme";

const DashboardLayout = () => {
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

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
