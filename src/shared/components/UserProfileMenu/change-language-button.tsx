import { useUser } from "../../hooks/use-user";
import { useUpdateUserInterfaceLanguage } from "../../../features/userConfig/hooks/use-user-config";
import { useState } from "react";
import { InterfaceLanguage } from "../../../features/userConfig/types/interface-language";

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
                    className={`flex items-center gap-1 py-1 text-sm ${
                        isOpen ? "bg-gray-200" : ""
                    } hover:bg-gray-100 rounded cursor-pointer focus:outline-none`}
                >
                    {/*#2b7fff*/}
                    <img
                        src="src/assets/icons/globe.svg"
                        alt="Language translation"
                        className="w-8 h-8"
                    />
                    <span className="w-6 text-left truncate text-[16px] font-medium">
                        {user.interfaceLanguage}
                    </span>
                    <span className="w-5 h-5 flex items-center justify-center text-gray-500 text-sm transition-all duration-200">
                        {isOpen ? "▲" : "▼"}
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-auto -translate-x-[13px] bg-white border border-gray-400 rounded-lg shadow-lg z-10">
                        <div
                            className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100"
                            onClick={() =>
                                handleLanguageChange(InterfaceLanguage.English)
                            }
                        >
                            English
                        </div>
                        <div className="my-1 mx-2 border-t border-gray-300" />

                        <div
                            className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100"
                            onClick={() =>
                                handleLanguageChange(InterfaceLanguage.Georgian)
                            }
                        >
                            ქართული
                        </div>

                        <div className="my-1 mx-2 border-t border-gray-300" />

                        <div
                            className="px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100"
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
