// src/shared/components/sidebar/sidebar.tsx
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMenuItems } from "./menu-config";
import { useTheme } from "../../context/theme-context/use-theme";
import { Theme } from "../../../features/user-config/types/theme";
import "./side-bar-styles.css";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const { t } = useTranslation();
    const menuItems = getMenuItems(t);
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const bgClass = isDark ? "bg-gray-900 text-white" : "bg-white text-black";
    const linkColor = isDark ? "text-yellow-300" : "text-blue-500";
    const hoverColor = isDark
        ? "hover:text-yellow-200 hover:bg-gray-800"
        : "hover:text-blue-700 hover:bg-gray-100";

    return (
        <aside
            className={`${bgClass}
                ${isOpen ? "w-64" : "w-16"} ${
                isDark ? "border-y border-gray-700" : "border-y border-gray-200"
            } overflow-hidden`}
        >
            <nav className="flex flex-col">
                {menuItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-2 py-2 px-4 whitespace-nowrap overflow-hidden 
                        ${hoverColor}
                        ${
                            isActive
                                ? isDark
                                    ? "inner-border-yellow"
                                    : "inner-border-blue"
                                : ""
                        }
                        ${linkColor}`
                        }
                    >
                        <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                            <Icon className="w-7 h-7" />
                        </span>

                        <span
                            className={`inline-block ${
                                isOpen
                                    ? "opacity-100 w-auto ml-2"
                                    : "opacity-0 w-0 ml-0"
                            }`}
                        >
                            {label}
                        </span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
