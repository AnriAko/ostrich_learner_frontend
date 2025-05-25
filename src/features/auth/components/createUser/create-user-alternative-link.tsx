import { Link } from "react-router-dom";

type CreateUserAlternativeLinkProps = {
    t: (key: string) => string;
    isDark: boolean;
};

const CreateUserAlternativeLink = ({
    t,
    isDark,
}: CreateUserAlternativeLinkProps) => (
    <>
        <hr
            className={`my-8 ${isDark ? "border-gray-600" : "border-gray-300"}`}
        />
        <div className="text-center text-xl mb-4 text-gray-500">
            {t("createUser.or")}
        </div>
        <div className="text-center">
            <Link to="/login" className="text-blue-600 hover:underline text-xl">
                {t("createUser.login")}
            </Link>
        </div>
    </>
);

export default CreateUserAlternativeLink;
