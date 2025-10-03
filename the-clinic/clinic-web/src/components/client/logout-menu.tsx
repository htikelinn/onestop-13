'use client'

import { DoorClosed } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export default function LogoutMenu() {

    async function logout() {
        // Logout Action Call
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
                <DoorClosed /> Sign Out
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}