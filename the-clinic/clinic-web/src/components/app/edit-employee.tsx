'use client'

import { EmployeeForm, EmployeeSchema } from "@/lib/model/employee.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as employeeClient from "@/lib/model/employee.service"
import * as roleClient from "@/lib/model/role.service"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { RoleListItem } from "@/lib/model/role.model"
import FormsSelect, { SelectOption } from "../forms/forms-select"
import { toast } from "sonner"
import { Form } from "../ui/form"
import FormsInput from "../forms/forms-input"
import { Button } from "../ui/button"
import { Save } from "lucide-react"

export default function EmployeeEditView() {

    const router = useRouter()

    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const [roles, setRoles] = useState<RoleListItem[]>([])
    const roleOptions:SelectOption[] = roles.map(a => ({key: String(a.id), value: a.name}))

    const form = useForm({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
            name: "",
            email: "",
            roleId: "",
            phone: "",
            assignAt: "",
            retiredAt: ""
        }
    })

    useEffect(() => {
        async function loadRoles() {
            const result = await roleClient.search({deleted : "false"})
            setRoles(result)
        }

        loadRoles()
    }, [setRoles])

    useEffect(() => {
        async function loadDetails() {
            if(id) {
                const details = await employeeClient.findById(id)
                form.reset({
                    name: details.name,
                    phone: details.phone,
                    email: details.email,
                    roleId: String(details.roleId),
                    assignAt: details.assignAt,
                    retiredAt: details.retiredAt
                })
            }
        }

        loadDetails()
    }, [id, form])

    async function save(form: EmployeeForm) {
        const result = await (id ? employeeClient.update(id, form) : employeeClient.create(form))
        if(result.success) {
            router.push(`/staff/employee/${result.message}`)
        } else {
            toast("Error", {
                description: result.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} className="w-2/3">
                <div className="grid grid-cols-2 gap-4 ">
                    <FormsSelect control={form.control} path="roleId" label="Role" options={roleOptions} />
                    <FormsInput control={form.control} path="name" label="Employee Name" />

                    <FormsInput control={form.control} path="phone" type="tel" label="Phone" />
                    <FormsInput control={form.control} path="email" type="email" label="Email Address" />

                    <FormsInput control={form.control} path="assignAt" type="date" label="Assign Date" />
                    <FormsInput control={form.control} path="retiredAt" type="date" label="Retire Date" />
                </div>
                <div className="pt-4">
                    <Button type="submit">
                        <Save /> Save Employee
                    </Button>
                </div>
            </form>
        </Form>
    )
}