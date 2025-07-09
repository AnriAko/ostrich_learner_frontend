import React from "react";
import { EditTitle } from "./edit-title";

interface Props {
    isEditing: boolean;
    title: string;
    onCancel: () => void;
    onConfirm: (newTitle: string) => void;
}

export const BookTitleBlock: React.FC<Props> = ({
    isEditing,
    title,
    onCancel,
    onConfirm,
}) => {
    if (isEditing) {
        return (
            <EditTitle
                initialValue={title}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        );
    }

    return (
        <div
            className="font-semibold w-full mb-2 break-words line-clamp-3 overflow-hidden text-ellipsis"
            title={title}
        >
            {title}
        </div>
    );
};
