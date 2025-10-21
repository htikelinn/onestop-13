'use client'

import { DepartmentForm, DepartmentSchema } from "@/lib/model/department.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as departmentClient from "@/lib/model/department.service"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Form } from "../ui/form"
import FormsInput from "../forms/forms-input"
import FormsSelect from "../forms/forms-select"
import FormsTextarea from "../forms/forms-textarea"
import { Button } from "../ui/button"
import { RefreshCw, Save } from "lucide-react"

export default function DepartmentEditView({id} : {id?: string}) {

    const router = useRouter()

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

    async function onSave(form:DepartmentForm) {
        const result = await (id ? departmentClient.update(id, form) : departmentClient.create(form))

        if(result.success) {
            router.push(`/staff/department/${result.message}`)
        } else {
            toast('Error', {
                description: result.message
            })
        }
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-3">
                    <FormsInput control={form.control} path="name" label="Department Name" className="w-1/3" />

                    <div className="flex items-start gap-3">
                        <FormsSelect control={form.control} path="icon" label="Icon" className="w-1/3" options={[
                            {key: "Stethoscope", value : "General Medicine"},
                            {key: "Heart", value : "Cardiology"},
                            {key: "Brain", value : "Neurology"},
                            {key: "Baby", value : "Pediatrics"},
                            {key: "Bone", value : "Orthopedics"},
                            {key: "Microscope", value : "Laboratory"}
                        ]} />
                        <FormsInput control={form.control} path="phone" type="tel" label="Phone Number" className="w-1/3" />
                    </div>

                    <FormsTextarea control={form.control} path="description" label="Description" />

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