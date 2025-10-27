'use client'

import { DepartmentListItem } from "@/lib/model/department.model"
import { DoctorForm, DoctorSchema } from "@/lib/model/doctor.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

import * as doctorClient from "@/lib/model/doctor.service"
import * as departmentClient from "@/lib/model/department.service"
import * as roleClient from "@/lib/model/role.service"

import { toast } from "sonner"
import { RoleListItem } from "@/lib/model/role.model"
import { Form } from "../ui/form"
import FormsSelect from "../forms/forms-select"
import FormsInput from "../forms/forms-input"
import { Plus, Save, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { safeCall } from "@/lib/action-utils"

export default function EditDoctorView() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const [departments, setDepartments] = useState<DepartmentListItem[]>([])
    const [roles, setRoles] = useState<RoleListItem[]>([])

    const form = useForm({
        resolver: zodResolver(DoctorSchema),
        defaultValues: {
            title: "",
            name: "",
            degree: "",
            departmentId: "",
            roleId: "",
            assignAt: "",
            email: "",
            phone: "",
            schedules: [{day: "", start: "", end: ""}]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "schedules"
    })

    useEffect(() => {
        async function load() {
            const result = await departmentClient.search({deleted: "false"})
            setDepartments(result)
        
            const roles = await roleClient.search({deleted : "false"})
            setRoles(roles)
        }

        load()
    }, [setDepartments, setRoles])

    useEffect(() => {
        async function load() {
            if(id) {
                const details = await doctorClient.findById(id)
                form.reset({
                    title: details.title,
                    name: details.name,
                    degree: details.degree,
                    departmentId: String(details.departmentId),
                    roleId: String(details.roleId),
                    assignAt: details.assignAt,
                    email: details.email,
                    phone: details.phone,
                    schedules: details.schedules
                })
            }
        }

        load()
    }, [id, form])

    async function save(form: DoctorForm) {
        safeCall(async () => {
            const result = await (id ? doctorClient.update(id, form) : doctorClient.create(form))
            router.push(`/staff/doctor/${result.id}`)
        })
    }

    function addSchedule() {
        append({day : "", start : "", end : ""})
    }

    function removeSchedule(index: number) {
        
        remove(index)

        if(form.watch('schedules').length == 0) {
            addSchedule()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} >
                
                <div className="grid grid-cols-3 gap-4">
                    <FormsSelect control={form.control} path="title" label="Title" options={[
                        {key : "Dr.", value: "Dr."},
                        {key : "Prof.", value: "Prof"},
                    ]}/>
                    <FormsInput control={form.control} path="name" label="Name" />
                    <div></div>

                    <FormsSelect control={form.control} path="departmentId" label="Department" options={departments.map(a => ({key: String(a.id), value: a.name}))} />
                    <FormsSelect control={form.control} path="roleId" label="Role" options={roles.map(a => ({key: String(a.id), value: a.name}))} />
                    <div></div>

                    <FormsInput control={form.control} path="degree" label="Degree" className="col-span-2" />
                    <div></div>

                    <FormsInput control={form.control} path="phone" label="Phone Number" type="tel" />
                    <FormsInput control={form.control} path="email" label="Email" type="email" />
                    <FormsInput control={form.control} path="assignAt" label="Asign At" type="date" />
                </div>

                <section className="my-6">
                    <h3 className="text-xl mb-4">Schedules</h3>

                    {fields.map((field, index) => 
                        <div key={field.id} className="flex gap-4 items-end mb-2">
                            <FormsSelect control={form.control} path={`schedules.${index}.day`} label={index == 0 ? "Day" : undefined} options={[
                                {key: "Monday", value: "Monday"},
                                {key: "Tuesday", value: "Tuesday"},
                                {key: "Wednesday", value: "Wednesday"},
                                {key: "Thursday", value: "Thursday"},
                                {key: "Friday", value: "Friday"},
                                {key: "Saturday", value: "Saturday"},
                                {key: "Sunday", value: "Sunday"}                                
                            ]} className="w-[160px]" />
                            <FormsInput control={form.control} path={`schedules.${index}.start`} label={index == 0 ? "Start Time" : undefined} type="time" className="w-[160px]"  />
                            <FormsInput control={form.control} path={`schedules.${index}.end`} label={index == 0 ? "End Time" : undefined} type="time" className="w-[160px]"  />
                            <Button type="button" onClick={() => removeSchedule(index)}>
                                <Trash />
                            </Button>
                        </div>
                    )}
                </section>

                <div className="space-x-2">
                    <Button type="button" onClick={addSchedule} variant={'secondary'} disabled={!form.formState.isValid}>
                        <Plus /> Add Schedule
                    </Button>

                    <Button type="submit" disabled={!form.formState.isValid}>
                        <Save /> Save Doctor
                    </Button>
                </div>
            </form>
        </Form>
    )
}