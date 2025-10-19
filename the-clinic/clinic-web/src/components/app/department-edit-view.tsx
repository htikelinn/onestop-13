'use client'

import { DepartmentForm, DepartmentSchema } from "@/lib/model/department.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"

export default function DepartmentEditView({edit} : {edit?: {id: number} & DepartmentForm}) {

    const form = useForm({
        resolver: zodResolver(DepartmentSchema),
        defaultValues: {
            name: edit?.name || "",
            icon: edit?.icon || "",
            phone: edit?.phone || "",
            description: edit?.description || ""
        }
    })
    
    async function onSave(form:DepartmentForm) {

    }

    return (
        <Form {...form}>
            <form >
                
            </form>
        </Form>
    )
}