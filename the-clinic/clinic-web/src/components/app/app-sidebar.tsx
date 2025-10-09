import { Menu, MenuGroup } from "@/lib/model/auth-model";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import Link from "next/link";
import React from "react";
import * as LucideIcons from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export default function AppSidebar({menus, portalName, portalLink} : {menus : MenuGroup[], portalName: 'Clinic' | 'Patient', portalLink: string})  {
    return (
        <Sidebar>
            <SidebarHeader>
                <Link href={portalLink}>
                    <div className="flex items-center gap-2">
                        <LucideIcons.HeartPlus></LucideIcons.HeartPlus>
                        <div className="flex flex-col">
                            <span className="text-lg">The Clinic</span>
                            <span className="text-sm">{portalName} Portal</span>
                        </div>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent>
            {menus.map((group, index) => 
                <SidebarGroup key={index}>
                    {group.name && 
                        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                    }

                    <SidebarContent>
                        <SidebarMenu>
                        {group.items.map((menu, index) => 
                            <AppMenu key={index} data={menu} />
                        )}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            )}
            </SidebarContent>

        </Sidebar>
    )
}

function AppMenu({data} : {data: Menu | React.ReactNode}) {

    if(React.isValidElement(data)) {
        return data as React.ReactNode
    }

    const menu = data as Menu
    const IconComponent = LucideIcons[menu.icon] as LucideIcons.LucideIcon

    return (
        <Collapsible className="group/collapsible" defaultOpen={true}>
            <SidebarMenuItem>
                {menu.path &&
                    <SidebarMenuButton asChild>
                        <Link href={menu.path}>
                            <IconComponent /> {menu.name}
                        </Link>
                    </SidebarMenuButton>
                } 

                {!menu.path && menu.items && 
                    <>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                                <IconComponent /> {menu.name}
                                <LucideIcons.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                            <SidebarMenuSub>
                            {menu.items.map((sub, index) => 
                                <SidebarMenuSubItem key={index}>
                                    <SidebarMenuSubButton asChild>
                                        <Link href={sub.path}>
                                            {sub.name}
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            )}    
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </>
                }  
            </SidebarMenuItem>        
        </Collapsible>
    )
}