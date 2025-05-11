// src/app/AppRouter.tsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import HomePage from "../features/home/components/HomePage";
import ProfilePage from "../features/profile/components/ProfilePage";
import LoginPage from "../features/auth/pages/LoginPage";
import CreateUserPage from "../features/auth/pages/CreateAccountPage";

const AppRouter = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/create" element={<CreateUserPage />} />
            </Routes>
        </MainLayout>
    );
};

export default AppRouter;
