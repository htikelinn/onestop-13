'use client'

import { DepartmentSearch } from "@/lib/model/department.model"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form"
import FormsSelect from "../forms/forms-select"
import FormsInput from "../forms/forms-input"
import { Button } from "../ui/button"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { queryString } from "@/lib/utils"

export default function DepartmentSearchView({search} : {search?: DepartmentSearch}) {

    const router = useRouter()

    const form = useForm<DepartmentSearch>({defaultValues: {
        deleted: search?.deleted,
        keyword: search?.keyword || ''
    }})

    async function onSearch(form:DepartmentSearch) {
        if(form.deleted === "-1") {
            form.deleted = undefined
        }
        router.replace(`/staff/department?${queryString(form)}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex items-end gap-4">
                <FormsSelect control={form.control} path="deleted" label="Status" options={[
                    {key: "-1", value: "All Status"},
                    {key: "false", value: "Active"},
                    {key: "true", value: "Deleted"},
                ]} />

                <FormsInput control={form.control} path="keyword" label="Keyword" placeholder="Search Keyword" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>

                    <Button type="button" variant={"destructive"} asChild>
                        <Link href={"/staff/department/create"}>
                            <Plus /> Add New
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}