'use client'

import { DoorClosed } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { logoutAction } from "@/lib/model/auth.service"

export default function LogoutMenu() {

    async function logout() {
        await logoutAction()
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
                <DoorClosed /> Sign Out
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}