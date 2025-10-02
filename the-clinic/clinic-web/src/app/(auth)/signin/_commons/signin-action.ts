'use server'

import { SignInForm } from "../../../../lib/auth-schema"

export async function signInAction(form:SignInForm) {
    console.log(form)
}
