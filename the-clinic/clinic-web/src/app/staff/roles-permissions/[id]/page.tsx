'use client'

import { Permission, RoleDetails } from "@/lib/model/role.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as roleClient from '@/lib/model/role.service'
import DetailsHeader from "@/components/app/details-header"
import IconComponent from "@/components/app/icon-component"
import SecurityInfo from "@/components/app/security-info"

export default function RoleDetailsView() {

    const { id } = useParams()
    const [details, setDetails] = useState<RoleDetails>()

    const permissions:Permission[] = details?.permissions || []

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await roleClient.findById(id as string)
                setDetails(result)
            }
        }

        load()
    }, [id, setDetails])

    return (
        <section className="space-y-6">
            <DetailsHeader icon="Shield" title={details?.name || ''}
                subTitle={details?.description || ''} 
                deleted={details?.deleted || false}
                editPath={`/staff/roles-permissions/edit?id=${id}`} />

            <section className="space-y-4">
                <h3 className="text-lg">Permissions</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-16 border rounded-lg p-4">
                    {permissions.length > 0 && permissions.map((item, index) => 
                        <div key={index} className="flex justify-between">
                            <div className="flex items-center space-x-2">
                                <IconComponent name={item.icon} />
                                <div>{item.name}</div>
                            </div>
                            <div className="text-foreground/60">{item.permission || "No Permission"}</div>
                        </div>
                    )}
                </div>
            </section>

            <SecurityInfo createdAt={details?.createdAt || ''}
                createdBy={details?.createdBy || ''}
                modifiedAt={details?.modifiedAt || ''}
                modifiedBy={details?.modifiedBy || ''} />

        </section>
    )
}