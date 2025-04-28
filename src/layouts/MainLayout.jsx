import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex h-screen w-full">
                <main className="flex-1 py-2">
                    <SidebarTrigger className="cursor-pointer" />
                    <div className="py-3">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}