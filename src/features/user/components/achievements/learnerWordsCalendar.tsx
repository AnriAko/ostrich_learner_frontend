import React, { useMemo } from "react";
import { useLearnedWordsCountByMonthForUser } from "./hooks/use-achievements";
import { useTranslation } from "react-i18next";

interface LearnedWordsCalendarProps {
    userId: string;
    year: number;
    month: number; // 1–12
    theme: "light" | "dark";
}

const daysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

export const LearnedWordsCalendar: React.FC<LearnedWordsCalendarProps> = ({
    userId,
    year,
    month,
    theme,
}) => {
    const { t } = useTranslation();

    const { data, isLoading, error } = useLearnedWordsCountByMonthForUser(
        userId,
        year,
        month
    );

    const countsByDate = useMemo(() => {
        if (!data) return {};
        const result: Record<string, number> = {};
        for (const stat of data) {
            result[stat.date] = stat.count;
        }
        return result;
    }, [data]);

    if (isLoading)
        return (
            <div className="text-center py-6 text-gray-500 font-medium">
                {t("calendar.loading", "Loading calendar...")}
            </div>
        );
    if (error)
        return (
            <div className="text-center py-6 text-red-500 font-medium">
                {t("calendar.error", "Error loading calendar")}
            </div>
        );

    const totalDays = daysInMonth(year, month);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

    const getBackgroundClass = (count: number) => {
        if (count >= 30)
            return theme === "dark"
                ? "from-green-200 to-green-300"
                : "from-green-700 to-green-800";
        if (count >= 20)
            return theme === "dark"
                ? "from-green-400 to-green-500"
                : "from-green-500 to-green-600";
        if (count > 0)
            return theme === "dark"
                ? "from-green-600 to-green-700"
                : "from-green-300 to-green-400";
        return theme === "dark"
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-100 hover:bg-gray-200";
    };

    const bgClass = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
    const contentBgClass =
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200 text-black";
    const borderClass =
        theme === "dark" ? "border-gray-700" : "border-gray-300";

    const titleColorClass =
        theme === "dark" ? "text-yellow-300" : "text-blue-600";

    const textColorClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
    const dayNumberColor = theme === "dark" ? "text-gray-100" : "text-gray-800";

    return (
        <div className={`${bgClass}`} style={{ minWidth: 420, maxWidth: 600 }}>
            <div
                className={`w-full max-w-[600px] py-6 space-y-6 rounded ${contentBgClass}`}
            >
                <h2
                    className={`text-2xl font-semibold mb-6 ${titleColorClass}`}
                >
                    {t("calendar.title", "Learned Words Calendar")} — {year}-
                    {month.toString().padStart(2, "0")}
                </h2>

                <div
                    className={`grid grid-cols-7 gap-3 mb-2 ${textColorClass}`}
                >
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                            <div
                                key={day}
                                className="text-center font-semibold"
                            >
                                {t(`calendar.weekDays.${day}`, day)}
                            </div>
                        )
                    )}
                </div>

                <div className="grid grid-cols-7 gap-3 text-sm select-none">
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={"empty-" + i} />
                    ))}

                    {daysArray.map((day) => {
                        const dateStr = `${year}-${month
                            .toString()
                            .padStart(2, "0")}-${day
                            .toString()
                            .padStart(2, "0")}`;

                        const count = countsByDate[dateStr] ?? 0;
                        const bgDayClass = getBackgroundClass(count);
                        const hasLearned = count > 0;

                        const title = hasLearned
                            ? t("calendar.wordsLearned", {
                                  count,
                                  defaultValue: "{{count}} word learned",
                              })
                            : t("calendar.noWordsLearned", "No words learned");

                        return (
                            <div
                                key={day}
                                className={`
                                    relative flex items-center justify-center
                                    rounded-lg border transition-shadow duration-200
                                    cursor-default h-12
                                    ${borderClass}
                                    ${
                                        hasLearned
                                            ? `bg-gradient-to-tr ${bgDayClass} shadow-md hover:shadow-lg`
                                            : bgDayClass
                                    }
                                `}
                                title={title}
                            >
                                <span
                                    className={`font-semibold ${dayNumberColor}`}
                                >
                                    {day}
                                </span>
                                {hasLearned && (
                                    <div className="absolute bottom-1 text-xs text-white opacity-0 hover:opacity-100 transition">
                                        {count}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
