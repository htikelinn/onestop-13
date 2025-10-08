'use server'

import { AuthResult, Menu } from "../model/dto/auth-dto"
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

export async function getEmployeeMenus():Promise<Menu[]> {
    return [
        {name: "Appointments", icon: 'CalendarCheck', items: [
            {name: "Create Appointment", path: ""},
            {name: "Check In", path: ""},
            {name: "Consultation", path: ""},
            {name: "Treatment", path: ""},
            {name: "Check Out", path: ""},
        ]},
        {name: "Patients", icon: 'Users', path: "/employee/patients"},
        {name: "Visit History", icon: 'History', path: "/employee/visits"},
        {name: "Test & Lab Results", icon: 'Microscope', path: "/employee/tests"},
        {name: "Management", icon: 'Settings', items: [
            {name: 'Employee', path: '/'},
            {name: 'Inventory', path: '/'},
            {name: 'Schedule', path: '/'},
        ]},
        {name: "Messages", icon : 'Mail', path: '/'},
        {name: "User Profile", icon : 'User', path: '/'}
    ]
}