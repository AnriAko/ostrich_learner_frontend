// CreateUserPage.tsx
import { useState, useEffect } from "react";
import { useCreateUser } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import type { CreateUserDto } from "../dto/create-user.dto";
import { AuthService } from "../services/auth-service";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { useUser } from "../../../shared/context/user-context/use-user";
import { Theme } from "../../../features/userConfig/types/theme";
import { InterfaceLanguage } from "../../../features/userConfig/types/interface-language";
import { THEME_LOCAL_STORAGE_KEY } from "../../../shared/context/theme-context/theme-local-storage";
import { INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY } from "../../../shared/context/language-context/interface-language-local-storage";

const CreateUserPage = () => {
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();
    const { mutate, isPending, isSuccess, isError, error, reset } =
        useCreateUser();
    const { setUser } = useUser();
    const { t } = useTranslation();

    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedNickname = nickname.trim();
        if (!trimmedNickname) return;

        // Попытка распарсить значения из localStorage
        const rawTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
        const rawLanguage = localStorage.getItem(
            INTERFACE_LANGUAGE_LOCAL_STORAGE_KEY
        );

        let parsedTheme: string | null = null;
        let parsedLanguage: string | null = null;

        try {
            parsedTheme = rawTheme ? JSON.parse(rawTheme) : null;
        } catch (err) {
            console.error("Failed to parse theme from localStorage:", err);
        }

        try {
            parsedLanguage = rawLanguage ? JSON.parse(rawLanguage) : null;
        } catch (err) {
            console.error("Failed to parse language from localStorage:", err);
        }

        const isValidTheme = Object.values(Theme).includes(
            parsedTheme as Theme
        );
        const isValidLanguage = Object.values(InterfaceLanguage).includes(
            parsedLanguage as InterfaceLanguage
        );

        const userData: CreateUserDto = {
            nickname: trimmedNickname,
            theme: isValidTheme ? (parsedTheme as Theme) : Theme.light,
            interfaceLanguage: isValidLanguage
                ? (parsedLanguage as InterfaceLanguage)
                : InterfaceLanguage.English,
        };

        console.log("Create user payload:", userData);

        mutate(userData, {
            onSuccess: async (createdUser) => {
                setNickname("");
                try {
                    const fullUser = await AuthService.getFullUserById(
                        createdUser.id
                    );
                    if (fullUser && setUser) {
                        setUser(fullUser);
                        navigate("/");
                    }
                } catch (err) {
                    console.error("Failed to fetch full user:", err);
                }
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            const timeout = setTimeout(() => reset(), 3000);
            return () => clearTimeout(timeout);
        }
    }, [isSuccess, reset]);

    return (
        <div
            className={`max-w-xl mx-auto mt-12 p-6 border-2 rounded-lg ${
                isDark
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
            }`}
        >
            <h1 className="text-3xl font-bold mb-6 text-center">
                {t("createUser.title")}
            </h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder={t("createUser.placeholder")}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className={`w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 ${
                        isDark
                            ? "bg-gray-700 border-gray-600 text-white focus:ring-yellow-300"
                            : "bg-white border-gray-300 text-black focus:ring-blue-400"
                    }`}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none ${
                        isDark
                            ? "bg-yellow-300 hover:bg-yellow-400 text-black"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    {isPending
                        ? t("createUser.creating")
                        : t("createUser.button")}
                </button>
            </form>

            {isSuccess && (
                <p className="text-center text-green-500">
                    {t("createUser.success")}
                </p>
            )}
            {isError && (
                <p className="text-center text-red-500">
                    {t("createUser.error")}{" "}
                    {error instanceof Error
                        ? error.message
                        : t("createUser.unknownError")}
                </p>
            )}

            <hr
                className={`my-8 ${
                    isDark ? "border-gray-600" : "border-gray-300"
                }`}
            />

            <div className="text-center text-xl mb-4 text-gray-500">
                {t("createUser.or")}
            </div>

            <div className="text-center">
                <Link
                    to="/signin"
                    className="text-blue-600 hover:underline text-xl"
                >
                    {t("createUser.login")}
                </Link>
            </div>
        </div>
    );
};

export default CreateUserPage;
