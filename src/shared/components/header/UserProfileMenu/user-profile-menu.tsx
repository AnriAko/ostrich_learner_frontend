import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user-navigation-styles.css";
import { useUser } from "../../../context/user-context/use-user";
import { useTheme } from "../../../context/theme-context/use-theme";
import { Theme } from "../../../../features/userConfig/types/theme";
import ToggleThemeIconButton from "./toggle-theme-icon-button";
import ChangeInterfaceLanguageButton from "./change-language-button";
import UserProfileDropdownButton from "./user-profile-dropdown-button";
import UserProfileDropdownMenu from "./user-profile-dropdown-menu";
import useOutsideClick from "./useOutsideClick";

const UserProfileMenu = () => {
    const { user, setUser } = useUser();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const currentTheme = user?.theme ?? theme;
    const isDark = currentTheme === Theme.dark;

    const menuRef = useRef<HTMLDivElement>(null);
    useOutsideClick(menuRef, () => setIsOpen(false));

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setUser(null);
        setIsOpen(false);
        navigate("/signin");
    };

    return (
        <div className="flex items-center gap-3" ref={menuRef}>
            <ChangeInterfaceLanguageButton />
            <ToggleThemeIconButton />

            <div
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div
                    className={`absolute left-0 right-0 top-0 z-0 duration-300 ease-out ${
                        isOpen ? "h-[50px]" : "h-0"
                    }`}
                />
                <div className="relative z-10">
                    <UserProfileDropdownButton
                        isOpen={isOpen}
                        isDark={isDark}
                        user={user}
                    />
                    {isOpen && (
                        <UserProfileDropdownMenu
                            isDark={isDark}
                            user={user}
                            onLogout={handleLogout}
                            closeMenu={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfileMenu;
