'use server'

import { AuthResponse, AuthResult, Menu, SignInForm, SignUpForm } from "./auth.model"
import { fetchApi, fetchWithAuth } from "../rest-client.utils"
import { getLoginUser, getRefreshToken, setAuthResult, } from "../login-info.utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signInAction(form:SignInForm):Promise<AuthResult> {
    
    try {
        const response = await fetchApi("auth/signin", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        const authResponse = await response.json() as AuthResponse
        
        await setAuthResult(authResponse)

        return {
            success: true,
            message: authResponse.role == 'Patient' ? "/patient" : '/staff'
        }

    } catch (e : any) {
        if(e.status && e.messages) {
            return {
                success: false,
                message: e.messages
            }
        }

        throw e
    }
}

export async function signUpAction(form:SignUpForm):Promise<AuthResult> {
    try {
        const response = await fetchApi("auth/signup", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        const authResponse = await response.json() as AuthResponse
        
        await setAuthResult(authResponse)

        return {
            success: true,
            message: authResponse.role == 'Patient' ? "/patient" : '/staff'
        }

    } catch (e : any) {
        if(e.status && e.messages) {
            return {
                success: false,
                message: e.messages
            }
        }

        throw e
    }
}

export async function refreshToken():Promise<string | undefined> {
    
    const refreshToken = await getRefreshToken()

    const refreshUrl = `${process.env.BASEURL}/auth/refresh`

    const response = await fetch(refreshUrl, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            token: refreshToken
        })
    })

    if(response.ok) {
        const authResponse = await response.json() as AuthResponse
        await setAuthResult(authResponse)
        return authResponse.accessToken
    }
}

export async function getEmployeeMenus():Promise<Menu[]> {
    const loginUser = await getLoginUser()
    const response = await fetchWithAuth(`staff/menu/${loginUser.email}`, {})
    return await response.json() as Menu[]
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")
    cookieStore.delete("accountInfo")
    redirect("/signin")
}