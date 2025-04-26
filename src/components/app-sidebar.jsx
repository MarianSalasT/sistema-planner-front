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

import { sidebarItems, sidebarAdminItems } from "@/constants/sidebar-items"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoMinisterio from "@/assets/logo-ministerio.jpg"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"

export function AppSidebar() {
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

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg"> 
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
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className={`${item.url === window.location.pathname ? 'text-blue-500' : 'text-gray-500'}`}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
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
                                                            <SidebarMenuSubButton asChild>
                                                                <a href={subItem.url} className="flex items-center gap-2"
                                                                    style={{ color: subItem.url === window.location.pathname ? '#3b82f6' : '#6b7280' }}>
                                                                    <subItem.icon className="size-4" style={{ color: 'inherit' }} />
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </SidebarMenuItem>
                                ) : (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url} className={`${item.url === window.location.pathname ? 'text-blue-500' : 'text-gray-500'}`}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}