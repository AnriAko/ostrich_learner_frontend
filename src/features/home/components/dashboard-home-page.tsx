import { useTranslation } from "react-i18next";
import { useTheme } from "../../../shared/context/theme-context/use-theme";
import { Link } from "react-router-dom";

const DashboardHomePage = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    const headingColor = theme === "dark" ? "text-yellow-300" : "text-blue-500";
    const linkColor = theme === "dark" ? "text-yellow-300" : "text-blue-500";
    const linkClass = `${linkColor} hover:underline`;

    return (
        <div
            className={`w-full ${
                theme === "dark"
                    ? "bg-gray-900 text-gray-300"
                    : "bg-gray-100 text-gray-800"
            }`}
        >
            <div className="p-6 rounded-md max-w-3xl mx-0">
                <h1 className={`text-3xl font-bold mb-6 ${headingColor}`}>
                    {t("dashboard.welcome")}
                </h1>

                <h2 className={`text-xl font-semibold mb-3`}>
                    {t("dashboard.modules.title")}
                </h2>

                <section className="mb-4">
                    <h3 className="font-semibold">
                        <Link to="/dashboard/add" className={linkClass}>
                            {t("dashboard.modules.addWords.title")}
                        </Link>
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>{t("dashboard.modules.addWords.feature1")}</li>
                        <li>{t("dashboard.modules.addWords.feature2")}</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h3 className="font-semibold">
                        <Link to="/dashboard/study" className={linkClass}>
                            {t("dashboard.modules.learnWords.title")}
                        </Link>
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>{t("dashboard.modules.learnWords.feature1")}</li>
                        <li>{t("dashboard.modules.learnWords.feature2")}</li>
                        <li>{t("dashboard.modules.learnWords.feature3")}</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h3 className="font-semibold">
                        <Link to="/dashboard/manage" className={linkClass}>
                            {t("dashboard.modules.viewWords.title")}
                        </Link>
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>{t("dashboard.modules.viewWords.feature1")}</li>
                        <li>{t("dashboard.modules.viewWords.feature2")}</li>
                        <li>{t("dashboard.modules.viewWords.feature3")}</li>
                        <li>{t("dashboard.modules.viewWords.feature4")}</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h3 className="font-semibold">
                        <Link to="/dashboard/books" className={linkClass}>
                            {t("dashboard.modules.translationManagement.title")}
                        </Link>
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>
                            {t(
                                "dashboard.modules.translationManagement.feature1"
                            )}
                        </li>
                        <li>
                            {t(
                                "dashboard.modules.translationManagement.feature2"
                            )}
                        </li>
                        <li>
                            {t(
                                "dashboard.modules.translationManagement.feature3"
                            )}
                        </li>
                        <li>
                            {t(
                                "dashboard.modules.translationManagement.feature4"
                            )}
                        </li>
                        <li>
                            {t(
                                "dashboard.modules.translationManagement.feature5"
                            )}
                        </li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h3 className="font-semibold">
                        {t("dashboard.modules.configuration.title")}
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>{t("dashboard.modules.configuration.feature1")}</li>
                        <li>{t("dashboard.modules.configuration.feature2")}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-3">
                        {t("dashboard.additional.title")}
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>
                            <Link
                                to="/dashboard/achievements"
                                className={linkClass}
                            >
                                {t("dashboard.additional.achievement")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/settings"
                                className={linkClass}
                            >
                                {t("dashboard.additional.settings")}
                            </Link>
                        </li>
                    </ul>
                </section>
                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-3">
                        {t("dashboard.download.title")}
                    </h3>
                    <ul className="list-disc ml-6">
                        <li>
                            <a
                                href="/src/static/ostrich-learner_0.1.0_x64-setup.exe"
                                download
                                className={linkClass}
                            >
                                {t("dashboard.download.exeInstaller")}
                            </a>
                        </li>
                        <li>
                            <a
                                href="/src/static/ostrich-learner_0.1.0_x64_en-US.msi"
                                download
                                className={linkClass}
                            >
                                {t("dashboard.download.msiInstaller")}
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default DashboardHomePage;
