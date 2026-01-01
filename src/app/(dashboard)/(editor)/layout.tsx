import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import type React from "react";

const Layout = ({ children}:{ children:React.ReactNode;}) => {
    return (
       <>
       <SidebarProvider>
       <AppHeader/>
       <main className="flex-1">{children}</main>
       </SidebarProvider>
       </>
        
    );
};

export default Layout;