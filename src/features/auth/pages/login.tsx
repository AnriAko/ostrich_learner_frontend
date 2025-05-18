import { useState } from "react";
import { useGetAllUsers } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth-service";
import { useUser } from "../../../shared/context/user-context/use-user";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../features/userConfig/types/theme";

// ...

const LoginPage = () => {
    const { t } = useTranslation();
    const { data: users = [], isLoading } = useGetAllUsers();
    const [search, setSearch] = useState("");
    const { setUser } = useUser();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const handleLogin = async (id: string) => {
        try {
            const fullUser = await AuthService.getFullUserById(id);
            if (fullUser) {
                setUser(fullUser);
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.nickname.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className={`max-w-xl mx-auto mt-12 p-6 border-2 rounded-lg ${
                isDark
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
            }`}
        >
            <h1 className="text-3xl font-bold mb-6 text-center">
                {t("auth.title")}
            </h1>

            <input
                type="text"
                placeholder={t("auth.searchPlaceholder")}
                className={`w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 ${
                    isDark
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                        : "bg-white border-gray-300 text-black focus:ring-blue-400"
                }`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isLoading ? (
                <p className="text-center">{t("auth.loading")}</p>
            ) : filteredUsers.length > 0 ? (
                <div
                    className={`rounded-lg p-4 overflow-y-auto max-h-[calc(3*(4rem+1rem))] scrollbar-custom ${
                        isDark
                            ? "border border-gray-600 bg-gray-700"
                            : "border-2 border-gray-300 bg-white"
                    }`}
                >
                    <ul className="flex flex-col">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => handleLogin(user.id)}
                                className={`cursor-pointer w-full h-12 flex items-center justify-center text-center text-lg font-semibold transition-colors duration-200 shadow-sm rounded
                                    ${
                                        isDark
                                            ? "bg-gray-700 border border-gray-600 text-white hover:bg-blue-900"
                                            : "bg-white border border-gray-300 hover:bg-blue-100 text-black"
                                    }`}
                            >
                                {user.nickname}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-500">{t("auth.noUsers")}</p>
            )}

            <hr
                className={`my-8 ${
                    isDark ? "border-gray-600" : "border-gray-300"
                }`}
            />

            <div className="text-center">
                <Link
                    to="/create"
                    className="text-blue-600 hover:underline text-m"
                >
                    {t("auth.createLink")}
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
