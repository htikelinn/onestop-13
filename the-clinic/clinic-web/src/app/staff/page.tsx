'use client'

import { loadPermission } from "@/lib/model/auth-permission.service"
import { useEffect } from "react"

export default function EmployeeHome() {

    useEffect(() => {
        loadPermission()
    }, [])

    return (
        <>
        </>
    )
}