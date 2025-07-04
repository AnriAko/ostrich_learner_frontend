import { BookPanel } from "./book-panel";

export const BooksPage = () => {
    return (
        <div className="flex gap-4">
            <div style={{ width: "300px" }}>
                <BookPanel />
            </div>
        </div>
    );
};
