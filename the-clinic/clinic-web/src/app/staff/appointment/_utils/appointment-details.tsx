'use client'

import Loading from "@/components/app/loading"
import { AppointmentDetails } from "@/lib/model/appointment.model"
import { usePermissionContext } from "@/lib/provider/permission-context"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as client from '@/lib/model/appointment.service'
import DetailsHeader from "@/components/app/details-header"

export default function AppointmentDetailsView() {

    const { id } = useParams()
    const [details, setDetails] = useState<AppointmentDetails>()

    const {permission} = usePermissionContext()
    const canEdit = permission === 'Modify' || permission === 'Delete'


    useEffect(() => {
        async function load() {
            if(id) {
                const result = await client.findById(id as string)
                setDetails(result)
            }
        }
        load()
    }, [id, setDetails])

    if(!details) {
        return (
            <Loading data="Appointment" />
        )
    }

    return (
        <>
            <DetailsHeader icon="CalendarCheck" title={details.doctor} 
                subTitle={`${details.scheduleDate} ${details.scheduleTime}`} 
                deleted={details.deleted} />
            <pre>{JSON.stringify(details, null, 2)}</pre>
        </>
    )
}