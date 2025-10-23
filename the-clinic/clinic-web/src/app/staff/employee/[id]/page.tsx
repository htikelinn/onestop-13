'use client'

import { EmployeeDetails } from "@/lib/model/employee.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as employeeClient from '@/lib/model/employee.service'
import DetailsHeader from "@/components/app/details-header"
import { Skeleton } from "@/components/ui/skeleton"
import SecurityInfo from "@/components/app/security-info"
import { LucideIconType } from "@/lib/model/auth.model"
import { Card } from "@/components/ui/card"
import IconComponent from "@/components/app/icon-component"

export default function EmployeeDetailsView() {

    const {id} = useParams()
    const [details, setDetails] = useState<EmployeeDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await employeeClient.findById(id as string)
                setDetails(result)
            }
        }

        load()
    }, [id, setDetails])

    if(!details) {
        return (
            <></>
        )
    }

    return (
        <section className="space-y-6">
            <DetailsHeader deleted={details.deleted}
                icon="User" title={details.name} subTitle={details.role} 
                editPath={`/staff/employee/edit?id=${details.id}`} />

            <section className="space-y-4">
                <h3 className="text-xl">Contact Information</h3>
                <Information icon="Phone" title="Phone Number" value={details.phone} />
                <Information icon="Mail" title="Email" value={details.email} />
            </section>

            <section className="space-y-4">
                <h3 className="text-xl">Employment Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Information icon="CalendarCheck" title="Assign At" value={details.assignAt} />
                    <Information icon="CalendarX" title="Retired At" value={details.retiredAt || "Not Now"} />
                </div>
            </section>

            <SecurityInfo createdAt={details.createdAt} createdBy={details.createdBy}
                modifiedAt={details.modifiedAt} modifiedBy={details.modifiedBy} />
        </section>
    )
}

function Information({icon, title, value} : {icon : LucideIconType, title : string, value : string}) {
    return (
        <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-4">
                <IconComponent name={icon} />

                <div>
                    <div className="text-foreground/70 text-sm">{title}</div>
                    <div>{value}</div>
                </div>
            </div>
        </div>
    )
}