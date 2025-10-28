'use client'

import { getPermission } from "@/lib/model/auth-permission.service"
import { logoutAction } from "@/lib/model/auth.service"
import { PermissionType, usePermissionContext } from "@/lib/provider/permission-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function PermissionLoader({path} : {path : string}) {

    const {setPermission} = usePermissionContext()

    const router = useRouter()

    useEffect(() => {
        async function load() {
            const permission = await getPermission(path)

            if(!permission) {
                await logoutAction()
                router.replace("/signin")
                return
            }

            setPermission(permission as PermissionType)
        }

        load()
    }, [setPermission, router])

    return (
        <></>
    )
}