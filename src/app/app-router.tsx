import { Routes, Route } from "react-router-dom";
import MainLayout from "../shared/layout/main-layout";
import DashboardLayout from "../shared/layout/dashboard-layout";

import HomePage from "../features/home/components/home";
import LoginPage from "../features/auth/pages/login-page";
import CreateUserPage from "../features/auth/pages/create-user-page";
import AddWordsPage from "../features/words/components/add-words/page/add-word-page";
import WordManagement from "../features/words/components/word-management/word-management";
import StudyPage from "../features/words/components/study-words/study-page";
import { BooksPage } from "../features/books/components/book-page";
import { BookReaderPage } from "../features/books/components/book-reader/book-reader-page";

import AchievementsPage from "../features/user/components/achievements/achievements-page";
import SettingsPage from "../features/user/components/settings/settings-page";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create" element={<CreateUserPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* Private DashboardLayout */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="add" element={<AddWordsPage />} />
                    <Route path="study" element={<StudyPage />} />
                    <Route path="manage" element={<WordManagement />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="books/:bookId" element={<BookReaderPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
