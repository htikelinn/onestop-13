'use client'

import { DepartmentDetails } from "@/lib/model/department.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as departmentClient from '@/lib/model/department.service'
import { LucideIconType } from "@/lib/model/auth.model"
import { DoctorListItem } from "@/lib/model/doctor.model"
import SecurityInfo from "@/components/app/security-info"
import NoSearchResult from "@/components/app/no-search-result"
import DetailsHeader from "@/components/app/details-header"
import { usePermissionContext } from "@/lib/provider/permission-context"
import Loading from "@/components/app/loading"
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item"
import { User } from "lucide-react"

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

    if(!details) {
        return (
            <Loading data="Department" />
        )
    }

    const {permission} = usePermissionContext()
    const canEdit = permission === 'Modify' || permission === 'Delete'

    return (
        <section className="space-y-6">
            <section>

                <DetailsHeader icon={(details.icon || 'ArrowRight') as LucideIconType} 
                    title={details.name} 
                    subTitle={details.phone} 
                    deleted={details.deleted} 
                    editPath={canEdit ? `/staff/department/edit?id=${id}` : undefined} />

                <p className="text-foreground/70 mt-4">{details.description}</p>

            </section>

            <section className="space-y-4">
                <h3 className="text-lg">
                    Doctors
                </h3>

                {doctors.length == 0 ? 
                    <NoSearchResult data="Doctors in department" /> :
                    <div className="grid grid-cols-3 gap-4">
                        {doctors.map(item => 
                            <Item key={item.id} variant={"outline"}>
                                <ItemMedia>
                                    <User />
                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle>{`${item.title} ${item.name}`}</ItemTitle>
                                    <ItemDescription>{item.phone}</ItemDescription>
                                </ItemContent>
                            </Item>
                        )}
                    </div>
                }

            </section>    
            
            <SecurityInfo createdAt={details.createdAt} 
                createdBy={details.createdBy}
                modifiedAt={details.modifiedAt}
                modifiedBy={details.modifiedBy} />

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

