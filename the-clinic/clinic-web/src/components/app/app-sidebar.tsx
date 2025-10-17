import { Menu, SubMenu } from "@/lib/model/auth-model";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import React from "react";
import * as LucideIcons from 'lucide-react'
import { Collapsible } from "../ui/collapsible";

export default function AppSidebar({menus, portalName, portalLink} : {menus : Menu[], portalName: 'Clinic' | 'Patient', portalLink: string})  {
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
                    {group.group && 
                        <SidebarGroupLabel>{group.group}</SidebarGroupLabel>
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

function AppMenu({data} : {data: SubMenu | React.ReactNode}) {

    if(React.isValidElement(data)) {
        return data as React.ReactNode
    }

    const menu = data as SubMenu
    const IconComponent = LucideIcons[menu.icon] as LucideIcons.LucideIcon

    return (
        <Collapsible className="group/collapsible" defaultOpen={true}>
            <SidebarMenuItem>
                {menu.path &&
                    <SidebarMenuButton asChild>
                        <Link href={menu.path}>
                            {IconComponent && <IconComponent />} {menu.name}
                        </Link>
                    </SidebarMenuButton>
                } 
            </SidebarMenuItem>        
        </Collapsible>
    )
}