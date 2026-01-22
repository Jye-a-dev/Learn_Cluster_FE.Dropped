import { ReactNode } from "react";
import NavbarContainer from "../../base/Navbar/Container";
import UserNavbar from "./Navbar/UserNavbar";
import WavesBackground from "../../base/Background/WavesBackground";
import FooterContainer from "../../base/Footer/FooterContainer";
import UserFooter from "./Footer/UserFooter";
import UserSidebar from "./Sidebar/UserSidebar";
import SidebarContainer from "../../base/Sidebar/SidebarContainer";

interface UserSetupProps {
  children: ReactNode;
}

export default function UserSetup({ children }: UserSetupProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <WavesBackground />
      </div>

      <NavbarContainer small>
        <UserNavbar />
      </NavbarContainer>

      <div className="relative z-10">
        <SidebarContainer>
          <UserSidebar />
        </SidebarContainer>

       <main className="ml-50 px-6 py-6 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>

      <FooterContainer>
        <UserFooter />
      </FooterContainer>
    </div>

  );
}
