import * as z from 'zod'
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

export type AccountInfo = {
    name: string
    email: string
    role: 'Patient' | 'Employee' | 'Admin'
}

/**
 * Server Response
 */
export type AuthResponse = AccountInfo & {
    accessToken: string
    refreshToken: string
}

/**
 * Response to Client Side Component
 */
export type AuthResult = {
    success: boolean
    message: string | string[]
}

export type Menu = {
    group: string
    items: SubMenu[]
}

export type SubMenu = {
    icon: LucideIconType
    name: string
    path: string
}

export type LucideIconType = keyof typeof lucideIcons

export type RestClientError = {
    status: number
    messages: string []
}