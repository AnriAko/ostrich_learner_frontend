import { InterfaceLanguage } from "../../../../features/userConfig/types/interface-language";

type LanguageDropdownProps = {
    isDark: boolean;
    onSelect: (language: InterfaceLanguage) => void;
};

const LanguageDropdown = ({ isDark, onSelect }: LanguageDropdownProps) => (
    <div
        className={`absolute top-full w-28 left-0 mt-2 rounded-lg shadow-lg z-10 border ${
            isDark
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-400 text-black"
        }`}
    >
        {[
            {
                label: "English",
                value: InterfaceLanguage.English,
                rounded: "rounded-t-lg",
            },
            { label: "ქართული", value: InterfaceLanguage.Georgian },
            {
                label: "Русский",
                value: InterfaceLanguage.Russian,
                rounded: "rounded-b-lg",
            },
        ].map(({ label, value, rounded }, index, arr) => (
            <div key={value}>
                <div
                    className={`px-4 py-2 cursor-pointer ${rounded ?? ""} ${
                        isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => onSelect(value)}
                >
                    {label}
                </div>
                {index < arr.length - 1 && (
                    <hr
                        className={`my-1 mx-2 ${
                            isDark ? "border-gray-600" : "border-gray-400"
                        }`}
                    />
                )}
            </div>
        ))}
    </div>
);

export default LanguageDropdown;
