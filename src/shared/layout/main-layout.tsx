import Header from "../components/header";
import Footer from "../components/footer";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[rgb(45,0,255,0.1)] font-ibm-plex">
            <Header />
            <main className="flex-1 container mx-auto">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
