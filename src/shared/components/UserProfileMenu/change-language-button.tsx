import { useUser } from "../../hooks/use-user";
import { useUpdateUserInterfaceLanguage } from "../../../features/userConfig/hooks/use-user-config";
import { useEffect, useRef, useState } from "react";
import { InterfaceLanguage } from "../../../features/userConfig/types/interface-language";

const ChangeInterfaceLanguageButton = () => {
    const { mutateAsync } = useUpdateUserInterfaceLanguage();
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const languageInterfaceMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                languageInterfaceMenuRef.current &&
                !languageInterfaceMenuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLanguageChange = async (language: InterfaceLanguage) => {
        if (!user) return;
        await mutateAsync({ userId: user.userId, interfaceLanguage: language });
    };

    if (!user) {
        return null;
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
            >
                Language: {user.interfaceLanguage}
            </button>
            {isOpen && (
                <div
                    ref={languageInterfaceMenuRef}
                    className="absolute left-full top-1/2 transform -translate-y-1/2 w-36 bg-white border border-gray-400 rounded-lg shadow-lg z-10"
                >
                    <div
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                            handleLanguageChange(InterfaceLanguage.English)
                        }
                    >
                        english
                    </div>
                    <div
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                            handleLanguageChange(InterfaceLanguage.Georgian)
                        }
                    >
                        ქართული
                    </div>
                    <div
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                            handleLanguageChange(InterfaceLanguage.Russian)
                        }
                    >
                        русский
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeInterfaceLanguageButton;
