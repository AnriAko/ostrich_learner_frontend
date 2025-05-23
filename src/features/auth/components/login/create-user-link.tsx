import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateUserLink = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center">
            <Link to="/create" className="text-blue-600 hover:underline text-m">
                {t("auth.createLink")}
            </Link>
        </div>
    );
};

export default CreateUserLink;
