import { ReactNode } from "react";
import NavbarContainer from "../../public/Navbar/Container";
import UserNavbar from "./Navbar/UserNavbar";
import WavesBackground from "./Background/WavesBackground";
import FooterContainer from "../../public/Footer/FooterContainer";
import UserFooter from "./Footer/UserFooter";

interface UserSetupProps {
    children: ReactNode;
}

export default function UserSetup({ children }:UserSetupProps) {
    return (
    <div className="relative min-h-screen flex flex-col">
            <WavesBackground/>

            <NavbarContainer>
                <UserNavbar/>
            </NavbarContainer>

            <main className="flex-1 relative z-10">
                {children}
            </main>

            <FooterContainer>
                <UserFooter/>
            </FooterContainer>
    </div>
    );
}