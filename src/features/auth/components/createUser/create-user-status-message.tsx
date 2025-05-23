type CreateUserStatusMessageProps = {
    isSuccess: boolean;
    isError: boolean;
    error: unknown;
    t: (key: string) => string;
};

const CreateUserStatusMessage = ({
    isSuccess,
    isError,
    error,
    t,
}: CreateUserStatusMessageProps) => {
    if (isSuccess) {
        return (
            <p className="text-center text-green-500">
                {t("createUser.success")}
            </p>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500">
                {t("createUser.error")}{" "}
                {error instanceof Error
                    ? error.message
                    : t("createUser.unknownError")}
            </p>
        );
    }

    return null;
};

export default CreateUserStatusMessage;
