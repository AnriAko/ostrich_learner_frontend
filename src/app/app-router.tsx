// src/app/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../shared/layout/main-layout";
import DashboardLayout from "../shared/layout/dashboard-layout";

import HomePage from "../features/home/components/home";
import LoginPage from "../features/auth/pages/login-page";
import CreateUserPage from "../features/auth/pages/create-user-page";
import AddWordsPage from "../features/words/features/add-words/page/add-word-page";
import { TestPage } from "../features/words/features/practice-words/features/flashcard/components/test-page";
import WordManagement from "../features/words/components/word-management/word-management";

// import LearnWords from "../features/dashboard/pages/learn-words";
// import NewWords from "../features/dashboard/pages/new-words";
// import RemindOldWords from "../features/dashboard/pages/remind-old-words";
// import Library from "../features/dashboard/pages/library";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create" element={<CreateUserPage />} />

                {/* Private DashboardLayout */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route path="add" element={<AddWordsPage />} />
                    <Route path="study" element={<TestPage />} />{" "}
                    <Route path="manage" element={<WordManagement />} />{" "}
                    {/* <-- вот этот */}
                    {/* 
                    <Route path="new" element={<NewWords />} />
                    <Route path="remind" element={<RemindOldWords />} />
                    <Route path="library" element={<Library />} /> */}
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRouter;
