import { ReactNode } from "react";
import NavbarContainer from "../../public/Navbar/Container";
import AdminNavbar from "./Navbar/AdminNavbar";
import WavesBackground from "@/components/layouts/dashboard/user/Background/WavesBackground";
import FooterContainer from "../../public/Footer/FooterContainer";
import AdminFooter from "./Footer/AdminFooter";
import SidebarContainer from "../user/Sidebar/SidebarContainer";
import AdminSidebar from "./Sidebar/AdminSidebar";
interface UserSetupProps {
  children: ReactNode;
}

export default function AdminSetup({ children }: UserSetupProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <WavesBackground />
      </div>

      <NavbarContainer small>
        <AdminNavbar />
      </NavbarContainer>

      <div className="relative z-10">
     <SidebarContainer>
        <AdminSidebar/>
     </SidebarContainer>

       <main className="ml-64 px-6 py-6 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>

      <FooterContainer>
        <AdminFooter />
      </FooterContainer>
    </div>

  );
}
