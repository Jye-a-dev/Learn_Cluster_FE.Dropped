import { ReactNode } from "react";
import NavbarContainer from "../../base/Navbar/Container";
import UserNavbar from "./Navbar/TeacherNavbar";
import FooterContainer from "../../base/Footer/FooterContainer";
import UserFooter from "./Footer/TeacherFooter";
import UserSidebar from "./Sidebar/TeacherSidebar";
import SidebarContainer from "../../base/Sidebar/SidebarContainer";
import KaleidoscopeBackground from "../../base/Background/KaleidoscopeBackground";

interface UserSetupProps {
  children: ReactNode;
}

export default function TeacherSetup({ children }: UserSetupProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <KaleidoscopeBackground/>
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
