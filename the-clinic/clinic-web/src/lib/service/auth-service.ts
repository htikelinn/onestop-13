'use server'

import { AuthResult } from "../model/dto/auth-dto"
import { SignInForm, SignUpForm } from "../model/schema/auth-schema"

export async function signInAction(form:SignInForm):Promise<AuthResult> {
    if(["patient", "employee"].includes(form.password.toLocaleLowerCase())) {
        return {
            success: true,
            message: form.password
        }
    }

    return {
        success: false,
        message: "Please check your login information."
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
