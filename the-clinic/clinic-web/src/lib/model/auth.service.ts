'use server'

import { AuthResponse, AuthResult, Menu, SignInForm, SignUpForm } from "./auth.model"
import { getLoginUser, setAuthResult, } from "../login-infos"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { publicRequest, secureRequest } from "../rest-clients"
import { POST_INIT } from "../utils"

export async function signInAction(form:SignInForm):Promise<AuthResult> {
    
    try {
        const response = await publicRequest("auth/signin", {
            ...POST_INIT,
            body: JSON.stringify(form),
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
        const response = await publicRequest("auth/signup", {
            ...POST_INIT,
            body: JSON.stringify(form),
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

export async function getEmployeeMenus():Promise<Menu[]> {
    const loginUser = await getLoginUser()
    const response = await secureRequest(`staff/menu/${loginUser.email}`, {})
    return await response.json() as Menu[]
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")
    cookieStore.delete("accountInfo")
    redirect("/signin")
}