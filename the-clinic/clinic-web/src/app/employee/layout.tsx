import AppSidebar from "@/components/app/app-sidebar";
import ChangePasswordMenu from "@/components/app/menu-change-password";
import LogoutMenu from "@/components/app/menu-logout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { LayoutProps } from "@/lib";
import { Menu } from "@/lib/model/dto/auth-dto";
import { getEmployeeMenus } from "@/lib/service/auth-service";

export default async function EmployeeLayout({children} : LayoutProps) {
    
    const menus = await getEmployeeMenus()
    const employeeMenus:(Menu | React.ReactNode)[] = Array.from(menus)
    employeeMenus.push(<ChangePasswordMenu key={'changePass'} />)
    employeeMenus.push(<LogoutMenu key={'logout'} />)
    
    return (
        <SidebarProvider>
            <AppSidebar menus={[{items: employeeMenus}]} portalLink="/employee" portalName="Clinic" />

            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}