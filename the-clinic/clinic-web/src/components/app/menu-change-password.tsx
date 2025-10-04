'use client'

import { Key } from "lucide-react"
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"

export default function ChangePasswordMenu() {

    async function showModaldialog() {

    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={showModaldialog}>
                <Key /> Change Password
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}