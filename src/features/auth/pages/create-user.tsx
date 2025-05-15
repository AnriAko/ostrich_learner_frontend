import { useState, useEffect, useContext } from "react";
import { useCreateUser } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import type { CreateUserDto } from "../dto/create-user.dto";
import { AuthService } from "../services/auth-service";
import { UserContext } from "../../../shared/context/user-context";
import { useTranslation } from "react-i18next";

const CreateUserPage = () => {
    const { t } = useTranslation();
    const [nickname, setNickname] = useState("");
    const { mutate, isPending, isSuccess, isError, error, reset } =
        useCreateUser();
    const userContext = useContext(UserContext);
    const setUser = userContext?.setUser;
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userData: CreateUserDto = { nickname: nickname.trim() };
        if (userData.nickname) {
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
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timeout = setTimeout(() => reset(), 3000);
            return () => clearTimeout(timeout);
        }
    }, [isSuccess, reset]);

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 border-2 border-gray-300 rounded-lg shadow-lg">
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
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none transition-colors duration-200"
                >
                    {isPending
                        ? t("createUser.creating")
                        : t("createUser.button")}
                </button>
            </form>

            {isSuccess && (
                <p className="text-center text-green-600">
                    {t("createUser.success")}
                </p>
            )}
            {isError && (
                <p className="text-center text-red-600">
                    {t("createUser.error")}{" "}
                    {error instanceof Error
                        ? error.message
                        : t("createUser.unknownError")}
                </p>
            )}

            <div className="text-center text-xl text-gray-600 mb-4">
                <span>{t("createUser.or")}</span>
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
