import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex h-screen w-full">
                <main className="flex-1 p-1">
                    <SidebarTrigger />
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}