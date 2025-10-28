'use client'

import { DepartmentForm, DepartmentSchema } from "@/lib/model/department.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as departmentClient from "@/lib/model/department.service"
import { useRouter, useSearchParams } from "next/navigation"
import { Form } from "../ui/form"
import FormsInput from "../forms/forms-input"
import FormsSelect, { SelectOption } from "../forms/forms-select"
import FormsTextarea from "../forms/forms-textarea"
import { Button } from "../ui/button"
import { RefreshCw, Save } from "lucide-react"
import { safeCall } from "@/lib/action-utils"
import { usePermissionContext } from "@/lib/provider/permission-context"
import { logoutAction } from "@/lib/model/auth.service"

const DEPARTMENT_ICONS:SelectOption[] = [
    {key: "Stethoscope", value : "General Medicine"},
    {key: "Heart", value : "Cardiology"},
    {key: "Brain", value : "Neurology"},
    {key: "Baby", value : "Pediatrics"},
    {key: "Bone", value : "Orthopedics"},
    {key: "Microscope", value : "Laboratory"}
]

export default function DepartmentEditView() {

    const router = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get("id")

    const {permission} = usePermissionContext()

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

    const form = useForm({
        resolver: zodResolver(DepartmentSchema),
        defaultValues: {
            name: "",
            icon: "",
            phone: "",
            description: ""
        }
    })

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await departmentClient.findById(id)
                form.reset({
                    name: result.name,
                    icon: result.icon,
                    phone: result.phone,
                    description: result.description
                })
            }
        }

        load()
    }, [id, form])

    const watchedIcon = form.watch('icon')

    useEffect(() => {
        const selectedIconName = DEPARTMENT_ICONS.filter(a => a.key == watchedIcon)
            .map(a => a.value)
            .pop()

        form.setValue('name', selectedIconName || "")
    }, [watchedIcon, form])

    async function onSave(form:DepartmentForm) {
        safeCall(async () => {
            const result = await (id ? departmentClient.update(id, form) : departmentClient.create(form))
            router.push(`/staff/department/${result.id}`)
        })
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="grid grid-cols-3 gap-4 items-start">

                    <FormsSelect control={form.control} path="icon" label="Icon" options={DEPARTMENT_ICONS} />
                    <FormsInput control={form.control} path="name" label="Department Name" />
                    <FormsInput control={form.control} path="phone" type="tel" label="Phone Number" />

                    <FormsTextarea control={form.control} path="description" label="Description" className="col-span-3" />

                    <div className="flex gap-2">
                        <Button type="submit">
                            <Save /> Save
                        </Button>

                        <Button type="reset" variant={'destructive'}>
                            <RefreshCw /> Reset
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}