// src/app/AppRouter.tsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "../shared/layout/main-layout";
import HomePage from "../features/home/components/home";
import LoginPage from "../features/auth/components/login/login";
import CreateUserPage from "../features/auth/components/createUser/create-user";

const AppRouter = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/create" element={<CreateUserPage />} />
            </Routes>
        </MainLayout>
    );
};

export default AppRouter;
