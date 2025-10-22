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
import FormsTextarea from "../forms/forms-textarea"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Save } from "lucide-react"

export default function EditRoleView() {

    const [features, setFeatures] = useState<AppFeature[]>([])
    const featureMap:Map<string, AppFeature> = features.reduce((a, b) => a.set(b.path, b), new Map<string, AppFeature>)

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
        const result = await (id ? roleClient.update(id, form) : roleClient.create(form))
        if(result.success) {
            router.push(`/staff/roles-permissions/${result.message}`)
        } else {
            toast('Error', {
                description: result.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} className="flex gap-8">
                
                <Card className="flex-1">
                    <CardContent>
                        <CardTitle>Role Information</CardTitle>

                        <div className="mt-4 space-y-3">
                            <FormsInput control={form.control} path="name" label="Role Name" />
                            <FormsTextarea control={form.control} path="description" label="Description" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardContent>
                        <CardTitle>Permission Settings</CardTitle>

                        <div className="mt-4 space-y-3">
                            {fields.map((field, index) => 
                                <div key={field.id} className="flex justify-between items-center">
                                    <span>{features[index].name}</span>
                                    <FormsSelect control={form.control} path={`permissions.${index}.permission`} options={[
                                        {key : "Read", value : "Read"},
                                        {key : "Write", value : "Write"},
                                        {key : "Modify", value : "Modify"},
                                        {key : "Delete", value : "Delete"}
                                    ]} className="w-[160px]" /> 
                                </div>
                            )}

                            <div >
                                <Button type="submit" className="w-full">
                                    <Save /> Save Role
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )

}