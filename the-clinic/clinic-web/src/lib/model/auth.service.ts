'use server'

import { AccountInfo, AuthResponse, AuthResult, Menu, SignInForm, SignUpForm } from "./auth.model"
import { cookies } from "next/headers"
import { fetchApi, fetchWithAuth, setAuthResult, withAuth } from "../rest-client.utils"


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

export async function getEmployeeMenus():Promise<Menu[]> {

    const cookieStore = await cookies()
    const loginUserString = cookieStore.get("accountInfo")?.value

    if(!loginUserString) {
        throw new Error("There is no login user.")
    }

    const loginUser = JSON.parse(loginUserString) as AccountInfo

    const response = await fetchWithAuth(`staff/menu/${loginUser.email}`, {})

    return await response.json() as Menu[]
}