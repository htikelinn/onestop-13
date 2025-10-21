'use client'

import { DepartmentDetails } from "@/lib/model/department.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as departmentClient from '@/lib/model/department.service'
import * as lucideIcons from 'lucide-react'
import { LucideIconType } from "@/lib/model/auth.model"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { DoctorListItem } from "@/lib/model/doctor.model"
import { Card } from "@/components/ui/card"
import SecurityInfo from "@/components/app/security-info"
import NoSearchResult from "@/components/app/no-search-result"

export default function DepartmentDetailsView() {

    const { id } = useParams()
    const [details, setDetails] = useState<DepartmentDetails>()

    const Icon = lucideIcons[(details?.icon || 'Network') as LucideIconType] as lucideIcons.LucideIcon
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
                <h1 className="flex justify-between items-center">
                    <div className="flex items-center-safe gap-3">
                        <Icon className="size-6" /> 
                        <div>
                            <span className="text-xl block">{details?.name}</span>
                            <span>{details?.phone}</span> - <span>{details?.deleted ? "Deleted" : "Active"}</span>
                        </div>
                    </div>

                    <Button asChild>
                        <Link href={`/staff/department/edit?id=${id}`}>
                            <lucideIcons.Pencil /> Edit
                        </Link>
                    </Button>
                </h1>

                <p className="text-foreground/70 mt-4">{details?.description}</p>

            </section>

            <section>
                <h3 className="text-lg flex justify-between items-center mb-4">
                    Doctors
                    <Button asChild>
                        <Link href={``}>
                            <lucideIcons.Plus /> Add Doctor
                        </Link>
                    </Button>
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
        <Card className="p-6 hover:shadow-md cursor-pointer flex flex-col items-center justify-center gap-2">
            <span className="text-xl">{item.title}. {item.name}</span>
            <span className="text-center">{item.phone}</span>
        </Card>
    )
}