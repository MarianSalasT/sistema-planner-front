import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex h-screen w-full">
                <main className="flex-1 py-2">
                    <SidebarTrigger className="cursor-pointer" />
                    <div className="py-3">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}