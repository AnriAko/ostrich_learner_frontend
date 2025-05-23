import { useTranslation } from "react-i18next";

type Props = {
    users: { id: string; nickname: string }[];
    onSelect: (id: string) => void;
    isDark: boolean;
};

const UserList = ({ users, onSelect, isDark }: Props) => {
    const { t } = useTranslation();

    if (users.length === 0) {
        return <p className="text-center text-gray-500">{t("auth.noUsers")}</p>;
    }

    return (
        <div
            className={`rounded-lg p-4 overflow-y-auto max-h-[calc(3*(4rem+1rem))] scrollbar-custom ${
                isDark
                    ? "border border-gray-600 bg-gray-700"
                    : "border-2 border-gray-300 bg-white"
            }`}
        >
            <ul className="flex flex-col">
                {users.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => onSelect(user.id)}
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
    );
};

export default UserList;
