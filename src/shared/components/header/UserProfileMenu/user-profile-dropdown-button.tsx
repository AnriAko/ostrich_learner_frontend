import { FC } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../../features/user-config/types/user";
import { CircleUserRound } from "lucide-react";

interface Props {
    isOpen: boolean;
    isDark: boolean;
    user: User | null;
}

const UserProfileDropdownButton: FC<Props> = ({ isOpen, isDark, user }) => {
    const { t } = useTranslation();

    return (
        <button
            className={`flex items-center gap-1 px-2 py-1 text-sm w-38 rounded cursor-pointer focus:outline-none font-medium ${
                isDark
                    ? `${
                          isOpen ? "bg-gray-700" : ""
                      } hover:bg-gray-600 text-white`
                    : `${
                          isOpen ? "bg-gray-200" : ""
                      } hover:bg-gray-100 text-gray-900`
            }`}
        >
            <CircleUserRound
                className={`w-7 h-7 ${
                    isDark ? "text-yellow-300" : "text-blue-500"
                }`}
            />
            <span className="w-auto text-[16px] text-center block">
                {user ? t("userMenu.profile") : t("userMenu.menu")}
            </span>
            <span
                className={`w-5 h-5 flex items-center justify-center text-sm transition-all duration-200 ${
                    isDark ? "text-gray-300" : "text-gray-500"
                }`}
            >
                {isOpen ? "▲" : "▼"}
            </span>
        </button>
    );
};

export default UserProfileDropdownButton;
