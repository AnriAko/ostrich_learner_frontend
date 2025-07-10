import { useState } from "react";
import { LearnedWordsCalendar } from "./learnerWordsCalendar";
import { useUser } from "../../../../shared/context/user-context/use-user";
import { useTheme } from "../../../../shared/context/theme-context/use-theme";
import { Theme } from "../../../user-config/types/theme";
import { useTranslation } from "react-i18next";

const AchievementsPage = () => {
    const { user } = useUser();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1); // 1-12

    if (!user)
        return (
            <div className="p-4 text-center text-red-500 font-semibold">
                {t(
                    "achievements.loginRequired",
                    "Please login to see achievements"
                )}
            </div>
        );

    const handlePrevMonth = () => {
        if (month === 1) {
            setYear(year - 1);
            setMonth(12);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setYear(year + 1);
            setMonth(1);
        } else {
            setMonth(month + 1);
        }
    };

    const isDark = theme === Theme.dark;

    const bgClass = isDark ? "bg-gray-800" : "bg-gray-100";
    const contentBgClass = isDark
        ? "bg-gray-900 text-white"
        : "bg-gray-200 text-black";

    const titleColorClass = isDark ? "text-yellow-300" : "text-blue-600";

    const buttonBgClass = isDark
        ? "bg-gray-700 hover:bg-gray-600"
        : "bg-gray-300 hover:bg-gray-400";
    const buttonTextClass = isDark ? "text-white" : "text-black";

    return (
        <div className={`p-4 ${bgClass}`}>
            <div
                className={`w-full p-6 space-y-6 rounded ${contentBgClass}`}
                style={{ minWidth: 420, maxWidth: 600, margin: 0 }}
            >
                <h1 className={`text-2xl mb-4 font-bold ${titleColorClass}`}>
                    {t("achievements.title", "Achievements")}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                    <button
                        onClick={handlePrevMonth}
                        className={`px-3 py-1 rounded ${buttonBgClass} ${buttonTextClass}`}
                    >
                        ← {t("achievements.previous", "Previous")}
                    </button>
                    <div className="font-semibold text-lg">
                        {year} - {month.toString().padStart(2, "0")}
                    </div>
                    <button
                        onClick={handleNextMonth}
                        className={`px-3 py-1 rounded ${buttonBgClass} ${buttonTextClass}`}
                    >
                        {t("achievements.next", "Next")} →
                    </button>
                </div>

                <div>
                    <LearnedWordsCalendar
                        userId={user.userId}
                        year={year}
                        month={month}
                        theme={isDark ? "dark" : "light"}
                    />
                </div>
            </div>
        </div>
    );
};

export default AchievementsPage;
