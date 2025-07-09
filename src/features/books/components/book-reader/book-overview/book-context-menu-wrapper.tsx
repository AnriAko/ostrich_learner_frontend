import React from "react";
import { BookMenu } from "./book-menu";

interface Props {
    pos: { x: number; y: number };
    bookId: string;
    onClose: () => void;
    onEditStart: () => void;
    onDelete: () => void;
}

export const BookContextMenuWrapper: React.FC<Props> = ({
    pos,
    bookId,
    onClose,
    onEditStart,
    onDelete,
}) => {
    return (
        <div
            style={{
                position: "fixed",
                top: pos.y,
                left: pos.x,
                transform: "translate(4px, 4px)",
                zIndex: 50,
            }}
        >
            <BookMenu
                bookId={bookId}
                onClose={onClose}
                onEditStart={onEditStart}
                onDelete={onDelete}
            />
        </div>
    );
};
