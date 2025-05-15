import { Link } from "react-router-dom";
import { useUser } from "../../../shared/hooks/use-user";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { user } = useUser();
    const { t } = useTranslation();

    if (!user) {
        return (
            <Link to="/signin" className="text-xl font-bold">
                {t("please_log_in")}
            </Link>
        );
    }

    return (
        <h1 className="text-xl font-bold">
            {t("welcome_user", { nickname: user.nickname })}
        </h1>
    );
};

export default HomePage;
