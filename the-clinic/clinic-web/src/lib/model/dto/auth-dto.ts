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
    name: string
    items: Menu[]
}

export type Menu = {
    name: string
    path?: string
    items?: SubMenu[]
}

export type SubMenu = {
    name: string
    path: string
}