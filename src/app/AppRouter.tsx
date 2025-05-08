// src/app/AppRouter.tsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import HomePage from "../features/home/components/HomePage";
import ProfilePage from "../features/profile/components/ProfilePage";

const AppRouter = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </MainLayout>
    );
};

export default AppRouter;
