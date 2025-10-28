'use client'

import { DoctorDetails } from "@/lib/model/doctor.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as doctorClient from '@/lib/model/doctor.service'
import DetailsHeader from "@/components/app/details-header"
import SecurityInfo from "@/components/app/security-info"
import EmploymentInfo from "@/components/app/employment-info"
import Information from "@/components/app/information"
import { usePermissionContext } from "@/lib/provider/permission-context"
import Loading from "@/components/app/loading"

export default function DoctorDetailsView() {

    const {id} = useParams()
    const [details, setDetails] = useState<DoctorDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await doctorClient.findById(id as string)
                setDetails(result)
            }
        }

        load()
    }, [id, setDetails])

    if(!details) {
        return (
            <Loading data="Doctor" />
        )
    }

    const {permission} = usePermissionContext()
    const canEdit = permission === 'Modify' || permission === 'Delete'

    return (
        <section className="space-y-6">
            <DetailsHeader icon="StethoscopeIcon" 
                title={`${details.title} ${details.name}`} subTitle={details.degree}
                deleted={details.deleted} editPath={canEdit ? `/staff/doctor/edit?id=${id}` : undefined} />

            {details.schedules.length > 0 && 
                <section>
                    <h3 className="text-xl mb-4">Schedule</h3>

                    <div className="grid grid-cols-3 gap-4">
                    {details.schedules.map((item, index) => 
                        <Information key={index} icon="Clock" title={item.day} value={`${item.start} - ${item.end}`} />
                    )}
                    </div>
                </section>
            }

            <section>
                <h3 className="text-xl mb-4">Personal Information</h3>

                <div className="grid grid-cols-3 gap-4">
                    <Information icon="Network" title="Department" value={details.department} />
                    <Information icon="Shield" title="Role" value={details.roleName} />
                    <Information icon="Phone" title="Phone" value={details.phone} />
                    <Information icon="Mail" title="Email" value={details.email} />
                </div>
            </section>

            <EmploymentInfo assignAt={details.assignAt} retiredAt={details.retiredAt} />

            <SecurityInfo createdAt={details.createdAt} createdBy={details.createdBy}
                modifiedAt={details.modifiedAt} modifiedBy={details.modifiedBy} />
        </section>
    )
}