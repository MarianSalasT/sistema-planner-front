import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuSub,
    SidebarMenuSubItem, 
    SidebarMenuSubButton
  } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useLocation, useNavigate } from "react-router-dom"
import { sidebarItems, sidebarAdminItems } from "@/constants/sidebar-items"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoMinisterio from "@/assets/logo-ministerio.jpg"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { User, LogOut } from "lucide-react"

export function AppSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { checkAuth, user, logout } = useAuth();
    const [openItems, setOpenItems] = useState(() => {
        const savedState = localStorage.getItem('sidebarOpenItems');
        return savedState ? JSON.parse(savedState) : {};
    });

    useEffect(() => {
        localStorage.setItem('sidebarOpenItems', JSON.stringify(openItems));
    }, [openItems]);

    const toggleItem = (itemId) => {
        setOpenItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const handleNavigation = async (url) => {
        await checkAuth();
        navigate(url);
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="cursor-pointer" onClick={() => navigate('/dashboard')}> 
                            <Avatar className="size-8">
                                <AvatarImage src={LogoMinisterio} />
                                <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col p-1">
                                <span className="font-medium">Sistema Planner</span>
                                <span className="text-xs text-muted-foreground">MTPBA</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton 
                                        onClick={() => handleNavigation(item.url)}
                                        className={`cursor-pointer ${item.url === location.pathname ? 'text-blue-500' : 'text-gray-500'}`}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {user.role === 'admin' && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Administrador</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                            {sidebarAdminItems.map((item) => (
                                item.type === 'collapse' ? (
                                    <SidebarMenuItem key={item.id}>
                                        <Collapsible open={openItems[item.id]} onOpenChange={() => toggleItem(item.id)}>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className="w-full justify-between text-gray-500 cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <item.icon className="size-4"/>
                                                        <span>{item.title}</span>
                                                    </div>
                                                    {openItems[item.id] ? (
                                                        <ChevronUp className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4" />
                                                    )}
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items && item.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.id}>
                                                            <SidebarMenuSubButton
                                                                onClick={() => handleNavigation(subItem.url)}
                                                                className="flex items-center gap-2 cursor-pointer"
                                                                style={{ color: subItem.url === location.pathname ? '#3b82f6' : '#6b7280' }}
                                                            >
                                                                <subItem.icon className="size-4" style={{ color: 'inherit' }} />
                                                                <span>{subItem.title}</span>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </SidebarMenuItem>
                                ) : (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton 
                                            onClick={() => handleNavigation(item.url)}
                                            className={`cursor-pointer ${item.url === location.pathname ? 'text-blue-500' : 'text-gray-500'}`}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                )}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <User className="size-4" />
                                        <span>{user.name}</span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="size-4" />
                                        <span>Cerrar sesión</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}