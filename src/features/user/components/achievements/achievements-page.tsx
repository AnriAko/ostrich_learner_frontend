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
    const [totalWords, setTotalWords] = useState(0);

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
                <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-4">
                    <div className="space-y-2 min-w-[280px] sm:min-w-[320px]">
                        <h1
                            className={`text-2xl font-bold ${titleColorClass} whitespace-nowrap`}
                        >
                            {t("achievements.title", "Achievements")}
                        </h1>

                        <div className="flex items-center space-x-4 flex-wrap">
                            <button
                                onClick={handlePrevMonth}
                                className={`px-3 py-1 rounded ${buttonBgClass} ${buttonTextClass}`}
                            >
                                ← {t("achievements.previous", "Previous")}
                            </button>
                            <div className="font-semibold text-lg whitespace-nowrap">
                                {year} - {month.toString().padStart(2, "0")}
                            </div>
                            <button
                                onClick={handleNextMonth}
                                className={`px-3 py-1 rounded ${buttonBgClass} ${buttonTextClass}`}
                            >
                                {t("achievements.next", "Next")} →
                            </button>
                        </div>

                        <div className="text-sm font-medium">
                            {t(
                                "achievements.totalLearned",
                                "Total words learned this month"
                            )}
                            :{" "}
                            <span className="font-bold text-green-500">
                                {totalWords}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm space-y-2 min-w-[180px] sm:min-w-[200px] ml-5">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-0.5 whitespace-nowrap">
                                <div className="h-4 w-10 rounded bg-gray-400 shrink-0" />
                                {t("achievements.level0", "0 words")}
                            </div>
                            <div className="flex items-center gap-2 mb-0.5 whitespace-nowrap">
                                <div
                                    className={`h-4 w-10 rounded bg-gradient-to-r ${
                                        isDark
                                            ? "from-green-600 to-green-700"
                                            : "from-green-300 to-green-400"
                                    } shrink-0`}
                                />
                                {t("achievements.level1", "1–19 words")}
                            </div>
                            <div className="flex items-center gap-2 mb-0.5 whitespace-nowrap">
                                <div
                                    className={`h-4 w-10 rounded bg-gradient-to-r ${
                                        isDark
                                            ? "from-green-400 to-green-500"
                                            : "from-green-500 to-green-600"
                                    } shrink-0`}
                                />
                                {t("achievements.level2", "20–29 words")}
                            </div>
                            <div className="flex items-center gap-2 mb-0.5 whitespace-nowrap">
                                <div
                                    className={`h-4 w-10 rounded bg-gradient-to-r ${
                                        isDark
                                            ? "from-green-200 to-green-300"
                                            : "from-green-700 to-green-800"
                                    } shrink-0`}
                                />
                                {t("achievements.level3", "30+ words")}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-1">
                    <LearnedWordsCalendar
                        userId={user.userId}
                        year={year}
                        month={month}
                        theme={isDark ? "dark" : "light"}
                        onTotalChange={(count: number) => setTotalWords(count)}
                    />
                </div>
            </div>
        </div>
    );
};

export default AchievementsPage;
