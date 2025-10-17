import AppSidebar from "@/components/app/app-sidebar";
import ChangePasswordMenu from "@/components/app/menu-change-password";
import LogoutMenu from "@/components/app/menu-logout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MenuGroup } from "@/lib/model/auth.model";
import type { LayoutProps } from "@/lib";
import React from "react";
import AppHeader from "@/components/app/app-header";

export default function PatientLayout({children} : LayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar menus={PATIENT_MENUS} portalLink="/patient" portalName="Patient" />
            <SidebarInset>
                <AppHeader baseUrl="/patient" routeNames={ROUTE_NAMES} />
                
                <main className="px-8 py-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

const ROUTE_NAMES = new Map<string, string>
ROUTE_NAMES.set("appointments", "Appointments")
ROUTE_NAMES.set("tests", "Test & Lab Result")
ROUTE_NAMES.set("medications", "Medications")
ROUTE_NAMES.set("medical-history", "Medical History")
ROUTE_NAMES.set("summary", "Clinic Summary")
ROUTE_NAMES.set("messages", "Messages")
ROUTE_NAMES.set("profile", "Profile")
ROUTE_NAMES.set("edit", "Modify")
ROUTE_NAMES.set("create", "Create New")


const PATIENT_MENUS:MenuGroup[] = [
    {items: [
        {name: "Appointments", icon: 'CalendarCheck', path: "/patient/appointments"},
        {name: "Medical Records", icon: 'History' ,items: [
            {name: "Test & Lab Result", path: "/patient/tests"},
            {name: "Medication List", path: "/patient/medications"},
            {name: "Medical History", path: "/patient/medical-history"},
            {name: "Clinical Summary", path: "/patient/summary"},
        ]},
        {name: "Messages", icon: 'Mail' ,path: "/patient/messages"},
        {name: "Profile", icon: 'User' ,path: "/patient/profile"},
        <ChangePasswordMenu key={'changepass'} />,
        <LogoutMenu key={"logout"} />
    ]}
]

