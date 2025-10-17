import AppHeader from "@/components/app/app-header";
import AppSidebar from "@/components/app/app-sidebar";
import ChangePasswordMenu from "@/components/app/menu-change-password";
import LogoutMenu from "@/components/app/menu-logout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { LayoutProps } from "@/lib";
import { Menu } from "@/lib/model/auth-model";
import { getEmployeeMenus } from "@/lib/service/auth-service";

export default async function EmployeeLayout({children} : LayoutProps) {
    
    const menus = await getEmployeeMenus()

    console.log(menus)

    return (
        <SidebarProvider>
            <AppSidebar menus={menus} portalLink="/staff" portalName="Clinic" />

            <SidebarInset>
                <AppHeader baseUrl="/staff" routeNames={ROUTE_NAMES} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

const ROUTE_NAMES = new Map<string, string>
ROUTE_NAMES.set("patients", "Patient Management")
ROUTE_NAMES.set("visits", "Visit History")
ROUTE_NAMES.set("tests", "Test & Lab Result")
