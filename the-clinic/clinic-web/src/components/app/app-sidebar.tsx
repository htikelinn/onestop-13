import { Menu, MenuGroup } from "@/lib/model/dto/auth-dto";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import Link from "next/link";

export default function AppSidebar({menus} : {menus : MenuGroup[]})  {
    return (
        <Sidebar>
            <SidebarHeader>

            </SidebarHeader>

            <SidebarContent>
            {menus.map((group, index) => 
                <SidebarGroup key={index}>
                    <SidebarGroupLabel>{group.name}</SidebarGroupLabel>

                    <SidebarContent>
                        <SidebarMenu>
                        {group.items.map((menu, index) => 
                            <AppMenu key={index} menu={menu} />
                        )}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            )}
            </SidebarContent>

            <SidebarFooter>

            </SidebarFooter>
        </Sidebar>
    )
}

function AppMenu({menu} : {menu: Menu}) {
    return (
        <SidebarMenuItem>
        {menu.path &&
            <SidebarMenuButton asChild>
                <Link href={menu.path}>{menu.name}</Link>
            </SidebarMenuButton>
        } 

        {!menu.path && menu.items && 
            <>
                <SidebarMenuButton>{menu.name}</SidebarMenuButton>

                <SidebarMenuSub>
                {menu.items.map((sub, index) => 
                    <SidebarMenuSubItem key={index}>
                        <SidebarMenuSubButton asChild>
                            <Link href={sub.path}>{sub.name}</Link>
                        </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                )}    
                </SidebarMenuSub>
            </>
        }  
        </SidebarMenuItem>
    )
}