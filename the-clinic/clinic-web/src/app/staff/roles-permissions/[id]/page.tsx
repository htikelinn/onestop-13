'use client'

import { Permission, RoleDetails } from "@/lib/model/role.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import * as roleClient from '@/lib/model/role.service'
import DetailsHeader from "@/components/app/details-header"
import IconComponent from "@/components/app/icon-component"
import SecurityInfo from "@/components/app/security-info"
import { usePermissionContext } from "@/lib/provider/permission-context"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import Loading from "@/components/app/loading"

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

    const { permission } = usePermissionContext()
    const canEdit = permission === 'Modify' || permission === 'Delete'

    if(!details) {
        return (
            <Loading data="Roles and Permission" />
        )
    }

    return (
        <section className="space-y-6">
            <DetailsHeader icon="Shield" title={details?.name || ''}
                subTitle={details?.description || ''} 
                deleted={details?.deleted || false}
                editPath={canEdit ? `/staff/roles-permissions/edit?id=${id}` : undefined} />

            <section className="space-y-4">
                <h3 className="text-lg">Permissions</h3>

                <div className="grid grid-cols-3 gap-4">
                    {permissions.length > 0 && permissions.map((item, index) => 
                        <Item key={index} variant={"outline"}>
                            <ItemMedia>
                                <IconComponent name={item.icon} />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{item.name}</ItemTitle>
                                <ItemDescription>{item.permission || "No Permission"}</ItemDescription>
                            </ItemContent>
                        </Item>
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