import React from "react"
import * as lucideIcons from 'lucide-react'

/**
 * Server Response
 */
export type AuthResponse = {
    name: string
    role: 'Patient' | 'Employee'
    accessToken: string
    refreshToken: string
}

/**
 * Response to Client Side Component
 */
export type AuthResult = {
    success: boolean
    message: string
}

export type MenuGroup = {
    name?: string
    items: (Menu | React.ReactNode)[]
}

export type Menu = {
    name: string
    icon: keyof typeof lucideIcons
    path?: string
    items?: SubMenu[]
}

export type SubMenu = {
    name: string
    path: string
}