import * as z from 'zod'
import React from "react"
import * as lucideIcons from 'lucide-react'

export const SignInSchema = z.object({
    email : z.string().nonempty("Please enter email for login."),
    password : z.string().nonempty("Please enter password.")
})

export type SignInForm = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
    name: z.string().nonempty("Please enter your name."),
    email : z.string().nonempty("Please enter email for login."),
    password : z.string().nonempty("Please enter password.")
})

export type SignUpForm = z.infer<typeof SignUpSchema>

/**
 * Server Response
 */
export type AuthResponse = {
    name: string
    email: string
    role: 'Patient' | 'Employee' | 'Admin'
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

export type LucideIconType = keyof typeof lucideIcons