'use server'

import { cookies } from "next/headers"
import { getLoginUser } from "../login-infos"
import { secureRequest } from "../rest-clients"
import { Permission } from "./auth-permission.model"

export async function loadPermission() {
    const loginUser = await getLoginUser()

    if(loginUser.role === 'Employee') {
        const response = await secureRequest(`staff/permissions/${loginUser.email}`, {})

        const permissions:Permission[] = await response.json()
        const cookieStore = await cookies()
        const secure = process.env.NODE_ENV === "production"

        permissions.forEach(permission => {
            cookieStore.set(permission.path, permission.permission, {
                httpOnly: true,
                secure: secure,
                sameSite: 'lax',
                path: "/",
                maxAge: 60 * 60
            })
        })
    }
}

export async function getPermission(path: string):Promise<string | undefined> {
    const loginUser = await getLoginUser()

    if(loginUser.role === 'Admin') {
        return "Delete"
    }

    const cookieStore = await cookies()
    return cookieStore.get(path)?.value
}