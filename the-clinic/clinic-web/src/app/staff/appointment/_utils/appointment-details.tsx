'use client'

import Loading from "@/components/app/loading"
import { AppointmentDetails } from "@/lib/model/appointment.model"
import { usePermissionContext } from "@/lib/provider/permission-context"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AppointmentDetailsView() {

    const { id } = useParams()
    const [details, setDetails] = useState<AppointmentDetails>()

    useEffect(() => {}, [id, setDetails])

    if(!details) {
        return (
            <Loading data="Appointment" />
        )
    }

    const {permission} = usePermissionContext()
    const canEdit = permission === 'Modify' || permission === 'Delete'

    return (
        <></>
    )
}