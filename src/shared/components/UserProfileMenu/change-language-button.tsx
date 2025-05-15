import { useUser } from "../../hooks/use-user";
import { useUpdateUserInterfaceLanguage } from "../../../features/userConfig/hooks/use-user-config";
import { useState } from "react";
import { InterfaceLanguage } from "../../../features/userConfig/types/interface-language";
import { Theme } from "../../../features/userConfig/types/theme";

const ChangeInterfaceLanguageButton = () => {
    const { mutateAsync } = useUpdateUserInterfaceLanguage();
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = async (language: InterfaceLanguage) => {
        if (!user) return;
        await mutateAsync({ userId: user.userId, interfaceLanguage: language });
        setIsOpen(false);
    };

    if (!user) return null;

    const isDark = user.theme === Theme.dark;

    return (
        <div className="relative">
            <div
                className={`absolute left-[-20px] right-[-20px] top-0 z-0 transition-all duration-300 ease-out ${
                    isOpen ? "h-[50px]" : "h-0"
                } bg-transparent`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            />

            <div
                className="relative z-10"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <button
                    className={`flex items-center gap-1 py-1 text-sm rounded cursor-pointer focus:outline-none ${
                        isOpen ? (isDark ? "bg-gray-700" : "bg-gray-200") : ""
                    } ${
                        isDark
                            ? "hover:bg-gray-800 text-white"
                            : "hover:bg-gray-100 text-black"
                    }`}
                >
                    <img
                        src="src/assets/icons/globe.svg"
                        alt="Language translation"
                        className="w-8 h-8"
                    />
                    <span className="w-6 text-left truncate text-[16px] font-medium">
                        {user.interfaceLanguage}
                    </span>
                    <span
                        className={`w-5 h-5 flex items-center justify-center text-sm transition-all duration-200 ${
                            isDark ? "text-gray-300" : "text-gray-500"
                        }`}
                    >
                        {isOpen ? "▲" : "▼"}
                    </span>
                </button>

                {isOpen && (
                    <div
                        className={`absolute top-full left-0 mt-2 w-auto -translate-x-[13px] border rounded-lg shadow-lg z-10 ${
                            isDark
                                ? "bg-gray-900 border-gray-600 text-white"
                                : "bg-white border-gray-400 text-black"
                        }`}
                    >
                        <div
                            className={`px-4 py-2 cursor-pointer rounded-lg ${
                                isDark
                                    ? "hover:bg-gray-800"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                                handleLanguageChange(InterfaceLanguage.English)
                            }
                        >
                            English
                        </div>
                        <div
                            className={`my-1 mx-2 border-t ${
                                isDark ? "border-gray-700" : "border-gray-300"
                            }`}
                        />

                        <div
                            className={`px-4 py-2 cursor-pointer rounded-lg ${
                                isDark
                                    ? "hover:bg-gray-800"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                                handleLanguageChange(InterfaceLanguage.Georgian)
                            }
                        >
                            ქართული
                        </div>

                        <div
                            className={`my-1 mx-2 border-t ${
                                isDark ? "border-gray-700" : "border-gray-300"
                            }`}
                        />

                        <div
                            className={`px-4 py-2 cursor-pointer rounded-lg ${
                                isDark
                                    ? "hover:bg-gray-800"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                                handleLanguageChange(InterfaceLanguage.Russian)
                            }
                        >
                            Русский
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangeInterfaceLanguageButton;
