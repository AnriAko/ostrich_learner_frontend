import { useTranslation } from "react-i18next";

type Props = {
    value: string;
    onChange: (val: string) => void;
    isDark: boolean;
};

const LoginSearchInput = ({ value, onChange, isDark }: Props) => {
    const { t } = useTranslation();

    return (
        <input
            type="text"
            placeholder={t("auth.searchPlaceholder")}
            className={`w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 ${
                isDark
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 text-black focus:ring-blue-400"
            }`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default LoginSearchInput;
