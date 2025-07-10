import React, { useEffect, useState } from "react";
import { useUser } from "../../../../shared/context/user-context/use-user";
import {
    useGetUserProfile,
    useUpdateNickname,
    useDeleteUser,
} from "./hooks/use-user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";

const SettingsPage: React.FC = () => {
    const { user, setUser } = useUser();
    const userId = user!.userId;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { theme } = useTheme();
    const isDark = theme === Theme.dark;

    const { data: profile, isLoading: isProfileLoading } =
        useGetUserProfile(userId);
    const { mutate: updateNickname, isPending: isSaving } =
        useUpdateNickname(userId);
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser(userId);

    const [nickname, setNickname] = useState("");

    useEffect(() => {
        if (profile?.nickname) {
            setNickname(profile.nickname);
        }
    }, [profile]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname.trim().length < 2) {
            toast.error(t("settings.nicknameMinLength"));
            return;
        }
        updateNickname(
            { nickname },
            {
                onSuccess: (data) => {
                    toast.success(
                        t("settings.nicknameUpdated", {
                            nickname: data.nickname,
                        })
                    );

                    const updatedUser = { ...user!, nickname: data.nickname };
                    setUser(updatedUser);
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(updatedUser)
                    );
                },
                onError: () => {
                    toast.error(t("settings.failedToUpdateNickname"));
                },
            }
        );
    };

    const handleDelete = () => {
        if (!confirm(t("settings.confirmDeleteAccount"))) return;
        deleteUser(undefined, {
            onSuccess: () => {
                toast.success(t("settings.accountDeleted"));
                localStorage.removeItem("currentUser");
                setUser(null);
                navigate("/login");
            },
            onError: () => {
                toast.error(t("settings.failedToDeleteAccount"));
            },
        });
    };

    const bgClass = isDark ? "bg-gray-800" : "bg-gray-100";
    const formBgClass = isDark
        ? "bg-gray-900 text-white"
        : "bg-gray-200 text-black";
    const borderClass = isDark ? "border-gray-700" : "border-gray-300";
    const buttonBgClass = isDark
        ? "bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800"
        : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800";
    const buttonTextClass = "text-white";

    return (
        <div className={`p-4 ${bgClass}`}>
            <div
                className={`w-full max-w-[384px] p-6 space-y-6 ${formBgClass}`}
            >
                <h1
                    className={`text-xl font-bold ${
                        isDark ? "text-yellow-300" : "text-blue-600"
                    }`}
                >
                    {t("settings.title")}
                </h1>

                {isProfileLoading ? (
                    <p className="text-gray-400">
                        {t("settings.loadingProfile")}
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t("settings.nicknameLabel")}
                            </label>
                            <input
                                type="text"
                                className={`w-full px-3 py-2 rounded border ${borderClass} ${
                                    isDark
                                        ? "bg-gray-700 text-white"
                                        : "bg-white text-black"
                                }`}
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                disabled={isSaving}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className={`w-full py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed ${buttonBgClass} ${buttonTextClass}`}
                        >
                            {isSaving
                                ? t("settings.saving")
                                : t("settings.save")}
                        </button>
                    </form>
                )}

                <hr className={`my-4 ${borderClass}`} />

                <div className="flex justify-between items-center">
                    <p className="text-red-600 text-sm font-medium">
                        {t("settings.dangerZone")}
                    </p>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white disabled:opacity-50"
                    >
                        {isDeleting
                            ? t("settings.deleting")
                            : t("settings.deleteAccount")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
