'use client'

import { DepartmentDetails } from "@/lib/model/department.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as departmentClient from '@/lib/model/department.service'
import { LucideIconType } from "@/lib/model/auth.model"
import { DoctorListItem } from "@/lib/model/doctor.model"
import { Card } from "@/components/ui/card"
import SecurityInfo from "@/components/app/security-info"
import NoSearchResult from "@/components/app/no-search-result"
import DetailsHeader from "@/components/app/details-header"

export default function DepartmentDetailsView() {

    const { id } = useParams()
    const [details, setDetails] = useState<DepartmentDetails>()

    const doctors = details?.doctors || []

    useEffect(() => {
        async function load(id:string) {
            const result = await departmentClient.findById(id)
            setDetails(result)
        }
        
        if(id) {
            load(id as string)
        }
    }, [id, setDetails])


    return (
        <section className="space-y-6">
            <section>

                <DetailsHeader icon={(details?.icon || 'ArrowRight') as LucideIconType} 
                    title={details?.name || ""} 
                    subTitle={details?.phone || ""} 
                    deleted={details?.deleted || false} 
                    editPath={`/staff/department/edit?id=${id}`} />

                <p className="text-foreground/70 mt-4">{details?.description}</p>

            </section>

            <section className="space-y-4">
                <h3 className="text-lg">
                    Doctors
                </h3>

                {doctors.length == 0 && 
                    <NoSearchResult data="Doctors in department" />
                }

                <div className="grid grid-cols-3 gap-4">
                    {doctors.map(item => 
                        <DoctorInfo key={item.id} item={item} />
                    )}
                </div>
            </section>    
            
            <SecurityInfo createdAt={details?.createdAt || ""} 
                createdBy={details?.createdBy || ""}
                modifiedAt={details?.modifiedAt || ""}
                modifiedBy={details?.modifiedBy || ""} />

        </section>
    )
}

function DoctorInfo({item} : {item:DoctorListItem}) {
    return (
        <div className="p-6 hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-2 border rounded-lg">
            <span className="text-xl">{item.title} {item.name}</span>
            <span className="text-center">{item.phone}</span>
        </div>
    )
}

