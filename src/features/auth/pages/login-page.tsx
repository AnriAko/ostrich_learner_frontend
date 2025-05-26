import { useState } from "react";
import { useGetAllUsers } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth-service";
import { useUser } from "../../../shared/context/user-context/use-user";
import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { Theme } from "../../user-config/types/theme";

import LoginSearchInput from "../components/login/login-search-input";
import UserList from "../components/login/user-list";
import CreateUserLink from "../components/login/create-user-link";

const LoginPage = () => {
    const { data: users = [], isLoading } = useGetAllUsers();
    const [search, setSearch] = useState("");
    const { setUser } = useUser();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const filteredUsers = users.filter((user) =>
        user.nickname.toLowerCase().includes(search.toLowerCase())
    );

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

    return (
        <div
            className={`max-w-xl mx-auto mt-12 p-6 border-2 rounded-lg ${
                isDark
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
            }`}
        >
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

            <LoginSearchInput
                value={search}
                onChange={setSearch}
                isDark={isDark}
            />

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <UserList
                    users={filteredUsers}
                    onSelect={handleLogin}
                    isDark={isDark}
                />
            )}

            <hr
                className={`my-8 ${
                    isDark ? "border-gray-600" : "border-gray-300"
                }`}
            />

            <CreateUserLink />
        </div>
    );
};

export default LoginPage;
