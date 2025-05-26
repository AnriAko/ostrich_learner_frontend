import { useUpdateUserInterfaceLanguage } from "../../../../features/user-config/hooks/use-user-config";
import { useState } from "react";
import { InterfaceLanguage } from "../../../../features/user-config/types/interface-language";
import { Theme } from "../../../../features/user-config/types/theme";
import { useUser } from "../../../context/user-context/use-user";
import { useInterfaceLanguage } from "../../../context/language-context/use-interface-language";
import { useTheme } from "../../../context/theme-context/use-theme";
import LanguageDropdown from "./language-dropdown";
import i18n from "../../../language/i18n";
import { Globe } from "lucide-react";

const LOCAL_STORAGE_KEY = "interfaceLanguage";

const ChangeInterfaceLanguageButton = () => {
    const { mutateAsync } = useUpdateUserInterfaceLanguage();
    const { user } = useUser();
    const { interfaceLanguage, setInterfaceLanguage } = useInterfaceLanguage();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const isDark = theme === Theme.dark;

    const handleLanguageChange = async (language: InterfaceLanguage) => {
        if (user) {
            await mutateAsync({
                userId: user.userId,
                interfaceLanguage: language,
            });
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, language);
            setInterfaceLanguage(language);
            await i18n.changeLanguage(language);
            console.log("Language changed to:", i18n.language);
        }
        setIsOpen(false);
    };

    // Цвета из Tailwind для lucide (превращаем в hex)
    const blue500 = "#3b82f6"; // blue-500
    const yellow300 = "#fcd34d"; // yellow-300
    const iconColor = isDark ? yellow300 : blue500;

    return (
        <div className="relative flex items-center">
            <div
                className={`absolute left-[-10px] right-[-10px] top-0 z-0 ${
                    isOpen ? "h-[50px]" : "h-0"
                } `}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            />

            <div
                className="relative z-10 w50"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <button
                    className={`flex w-24 items-center gap-1 px-2 py-1 text-sm rounded cursor-pointer focus:outline-none font-medium ${
                        isDark
                            ? `${
                                  isOpen ? "bg-gray-700" : ""
                              } hover:bg-gray-600 text-white`
                            : `${
                                  isOpen ? "bg-gray-200" : ""
                              } hover:bg-gray-100 text-black`
                    }`}
                >
                    <Globe
                        className="w-7 h-7 flex-shrink-0"
                        color={iconColor}
                    />
                    <span className="w-auto text-left text-[16px] truncate leading-none">
                        {interfaceLanguage?.toUpperCase()}
                    </span>
                    <span
                        className={`w-5 h-5 flex-shrink-0 flex items-center justify-center text-sm transition-all duration-200 ${
                            isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                    >
                        {isOpen ? "▲" : "▼"}
                    </span>
                </button>

                {isOpen && (
                    <LanguageDropdown
                        isDark={isDark}
                        onSelect={handleLanguageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default ChangeInterfaceLanguageButton;
