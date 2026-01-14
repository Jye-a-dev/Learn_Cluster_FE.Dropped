// app/layouts/PublicSetup.tsx
"use client";

import Navbar from "@/components/layouts/public/Navbar/Navbar"; // đường dẫn tới Navbar
import { ReactNode } from "react";
import NavbarContainer from "./Navbar/Container";
import GalaxyBackground from "./Background/GalaxyBackground";
import Footer from "./Footer/Footer";
import FooterContainer from "./Footer/FooterContainer";
interface PublicSetupProps {
    children: ReactNode;
}

export default function PublicSetup({ children }: PublicSetupProps) {
    return (
     <div className="relative isolate min-h-screen flex flex-col overflow-x-hidden">
            <GalaxyBackground />

            <NavbarContainer>
                <Navbar />
            </NavbarContainer>

            <main className="flex-1 relative z-10">
                {children}
            </main>

            <FooterContainer>
                <Footer />
            </FooterContainer>
        </div>
    );
}

