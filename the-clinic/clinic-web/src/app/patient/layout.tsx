import AppSidebar from "@/components/app/app-sidebar";
import ChangePasswordMenu from "@/components/client/change-password-menu";
import LogoutMenu from "@/components/client/logout-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MenuGroup } from "@/lib/model/dto/auth-dto";
import React from "react";

export default function PatientLayout({children} : {children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar menus={PATIENT_MENUS} portalLink="/patient" portalName="Patient" />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

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

