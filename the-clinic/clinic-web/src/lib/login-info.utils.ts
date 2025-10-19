'use server'

import { cookies } from "next/headers"
import { AccountInfo, AuthResponse } from "./model/auth.model"
import { redirect } from "next/navigation"

export async function setAuthResult(response : AuthResponse) {

    const {accessToken, refreshToken, ...accountInfo} = response
        
    const secure = process.env.NODE_ENV === "production"

    const cookieStore = await cookies()
    
    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    })

    cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    })

    cookieStore.set('accountInfo', JSON.stringify(accountInfo), {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    })
}

export async function clearAuthResult() {
    const cookieStore = await cookies()
    cookieStore.delete("accessToken") 
    cookieStore.delete("refreshToken") 
    cookieStore.delete("accountInfo") 
}

export async function getLoginUser() {
    const cookieStore = await cookies()
    const loginUserString = cookieStore.get("accountInfo")?.value

    if(!loginUserString) {
        redirect("/signin")
    }

    return JSON.parse(loginUserString) as AccountInfo
}

export async function getAccessToken() {
    const cookieStore = await cookies()
    return cookieStore.get("accessToken")?.value
}

export async function getRefreshToken() {
    const cookieStore = await cookies()
    return cookieStore.get("refreshToken")?.value
}
