'use client'

import { AppFeature } from "@/lib/model/feature.model"
import { Permission, RoleDetails, RoleForm, RoleSchema } from "@/lib/model/role.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

import * as featureClient from '@/lib/model/feature.service'
import * as roleClient from '@/lib/model/role.service'

import { useRouter, useSearchParams } from "next/navigation"
import { Form } from "../ui/form"
import { toast } from "sonner"
import FormsInput from "../forms/forms-input"
import FormsSelect from "../forms/forms-select"
import { Button } from "../ui/button"
import { Save } from "lucide-react"
import IconComponent from "./icon-component"
import { safeCall } from "@/lib/action-utils"
import { usePermissionContext } from "@/lib/provider/permission-context"
import { logoutAction } from "@/lib/model/auth.service"

export default function EditRoleView() {

    const [features, setFeatures] = useState<AppFeature[]>([])

    const router = useRouter()

    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const form = useForm({
        resolver: zodResolver(RoleSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: []
        }
    })

    const { fields } = useFieldArray({
        control: form.control,
        name: "permissions"
    })

    useEffect(() => {
        async function loadFeature() {
            const result = await featureClient.search({})
            setFeatures(result)
        }

        loadFeature()
    }, [setFeatures])

    useEffect(() => {

        async function loadForm() {

            let details:RoleDetails | undefined
            let permissionMap:Map<string, Permission> = new Map

            if(id) {
                details = await roleClient.findById(id)
                permissionMap = details.permissions.reduce((a, b) => a.set(b.path, b), new Map<string, Permission>)
            }            

            form.reset({
                name: details?.name || "",
                description: details?.description || "",
                permissions: features.map(a => {
                    const permission = permissionMap.get(a.path)
                    return permission || {
                        path: a.path,
                        permission: undefined
                    }
                })
            })
        }

        loadForm()
    }, [features, id, form])

    async function save(form: RoleForm) {
        safeCall(async () => {
            const result = await (id ? roleClient.update(id, form) : roleClient.create(form))
            router.push(`/staff/roles-permissions/${result.id}`)
        })
    }

    const { permission } = usePermissionContext()

    useEffect(() => {

        async function logout() {
            await logoutAction()
            router.replace('/signin')
        }

        if(permission === 'Read') {
            logout()
        }

        if(id && (permission === 'Write')) {
            logout()
        }
    }, [id, permission, router])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} className="space-y-6">

                <section className="space-y-3">
                    <h3 className="text-xl">Role Information</h3>

                    <div className="flex gap-4">
                        <FormsInput control={form.control} path="name" label="Role Name" className="w-1/3" />
                        <FormsInput control={form.control} path="description" label="Description" className="w-2/3" />
                    </div>
                </section>   

                <section className="space-y-3">
                    <h3 className="text-xl">Permissions</h3>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-16">
                        {fields.map((field, index) => 
                            <div key={field.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconComponent name={features[index].icon} />
                                    <span>{features[index].name}</span>
                                </div>
                                <FormsSelect control={form.control} path={`permissions.${index}.permission`} options={[
                                    {key : "Read", value : "Read"},
                                    {key : "Write", value : "Write"},
                                    {key : "Modify", value : "Modify"},
                                    {key : "Delete", value : "Delete"}
                                ]} className="w-[160px]" /> 
                            </div>
                        )}
                    </div>
                </section>             
                
                <Button type="submit">
                    <Save /> Save Role
                </Button>
            </form>
        </Form>
    )

}