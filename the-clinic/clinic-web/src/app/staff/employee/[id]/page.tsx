'use client'

import { EmployeeDetails } from "@/lib/model/employee.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as employeeClient from '@/lib/model/employee.service'
import DetailsHeader from "@/components/app/details-header"
import SecurityInfo from "@/components/app/security-info"
import Information from "@/components/app/information"
import EmploymentInfo from "@/components/app/employment-info"

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

            <EmploymentInfo assignAt={details.assignAt} retiredAt={details.retiredAt} />

            <SecurityInfo createdAt={details.createdAt} createdBy={details.createdBy}
                modifiedAt={details.modifiedAt} modifiedBy={details.modifiedBy} />
        </section>
    )
}