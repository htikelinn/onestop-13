'use server'

import { AccountInfo, AuthResponse, AuthResult, Menu, SignInForm, SignUpForm } from "../model/auth-model"
import { cookies } from "next/headers"
import { fetchApi, fetchWithAuth, withAuth } from "./utils"


export async function signInAction(form:SignInForm):Promise<AuthResult> {
    
    try {
        const response = await fetchApi("auth/signin", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        const {accessToken, refreshToken, ...accountInfo} = await response.json() as AuthResponse
        
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

        return {
            success: true,
            message: accountInfo.role == 'Patient' ? "/patient" : '/staff'
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
    if([
        "minlwin@gmail.com",
        "member@gmail.com",
        "doctor@gmail.com",
        "admin@gmail.com"
    ].includes(form.email)) {
        return {
            success: false,
            message: "Your email is already used."
        }
    }

    return {
        success: true,
        message: "Patient"
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