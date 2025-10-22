'use client'

import { Permission, RoleDetails } from "@/lib/model/role.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as roleClient from '@/lib/model/role.service'
import DetailsHeader from "@/components/app/details-header"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
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

            <section>
                <h3 className="text-lg">Permissions</h3>

                <div className="grid grid-cols-3 gap-4 mt-4">
                    {permissions.length > 0 && permissions.map((item, index) => 
                        <Card key={index}>
                            <CardContent>
                                <CardTitle className="flex items-center gap-2">
                                    <IconComponent name={item.icon} />
                                    <div className="space-y-1">
                                        <div>{item.name}</div>
                                        <div className="text-foreground/60">{item.permission || "No Permission"}</div>
                                    </div>
                                </CardTitle>
                            </CardContent>
                        </Card>
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