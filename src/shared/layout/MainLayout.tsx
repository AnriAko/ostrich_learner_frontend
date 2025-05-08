import Header from "../components/Header";
import Footer from "../components/Footer";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
