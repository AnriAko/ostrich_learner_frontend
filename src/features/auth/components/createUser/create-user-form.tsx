import React from "react";

type CreateUserFormProps = {
    nickname: string;
    setNickname: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    isPending: boolean;
    isDark: boolean;
    t: (key: string) => string;
};

const CreateUserForm = ({
    nickname,
    setNickname,
    handleSubmit,
    isPending,
    isDark,
    t,
}: CreateUserFormProps) => (
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
            {isPending ? t("createUser.creating") : t("createUser.button")}
        </button>
    </form>
);

export default CreateUserForm;
