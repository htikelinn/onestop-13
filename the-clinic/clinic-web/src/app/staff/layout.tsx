import AppHeader from "@/components/app/app-header";
import AppSidebar from "@/components/app/app-sidebar";
import ChangePasswordMenu from "@/components/app/menu-change-password";
import LogoutMenu from "@/components/app/menu-logout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { LayoutProps } from "@/lib";
import { Menu } from "@/lib/model/auth.model";
import { getEmployeeMenus } from "@/lib/model/auth.service";
import PermissionContextProvider from "@/lib/provider/permission-context-provider";

export default async function EmployeeLayout({children} : LayoutProps) {
    
    const menus = await getEmployeeMenus()

    const personamMenu:Menu = {
        group: "Personal Setting",
        items: [
            <ChangePasswordMenu />,
            <LogoutMenu />
        ]
    }

    menus.push(personamMenu)

    return (
        <SidebarProvider>
            <AppSidebar menus={menus} portalLink="/staff" portalName="Clinic" />

            <SidebarInset>
                <AppHeader baseUrl="/staff" routeNames={ROUTE_NAMES} />

                <main className="px-8 py-4">
                    <PermissionContextProvider>
                        {children}
                    </PermissionContextProvider>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

const ROUTE_NAMES = new Map<string, string>
ROUTE_NAMES.set("appointment", "Appointments")
ROUTE_NAMES.set("employee", "Employee Management")
ROUTE_NAMES.set("patient", "Patient Management")
ROUTE_NAMES.set("department", "Department Master")
ROUTE_NAMES.set("doctor", "Doctor Master")
ROUTE_NAMES.set("feature", "Application Features")
ROUTE_NAMES.set("roles-permissions", "Roles & Permissions")
ROUTE_NAMES.set("create", "Add New")
ROUTE_NAMES.set("edit", "Modify")
