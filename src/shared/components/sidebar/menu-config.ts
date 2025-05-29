// src/shared/components/sidebar/menu-config.ts
import { TFunction } from "i18next";
import {
    Brain,
    NotebookPen,
    BookOpenCheck,
    BookA,
    Settings2,
} from "lucide-react";

export interface MenuItems {
    to: string;
    label: string;
    icon: React.ElementType;
}

export const getMenuItems = (t: TFunction): MenuItems[] => [
    {
        to: "/dashboard/add",
        label: t("sidebar.addWords"),
        icon: NotebookPen,
    },
    {
        to: "/dashboard/study",
        label: t("sidebar.study"),
        icon: Brain,
    },
    {
        to: "/dashboard/repeat",
        label: t("sidebar.repeat"),
        icon: BookOpenCheck,
    },
    {
        to: "/dashboard/wordList",
        label: t("sidebar.wordList"),
        icon: BookA,
    },
    {
        to: "/dashboard/manage",
        label: t("sidebar.manageWords"),
        icon: Settings2,
    },
];
