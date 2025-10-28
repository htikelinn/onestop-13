'use client'

import { Form } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DoctorListItem, DoctorSearch } from "@/lib/model/doctor.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import * as departmentClient from '@/lib/model/department.service'
import * as doctorClient from '@/lib/model/doctor.service'

import FormsSelect from "@/components/forms/forms-select"
import { DepartmentListItem } from "@/lib/model/department.model"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Search } from "lucide-react"
import Link from "next/link"
import ActiveStatus from "@/components/app/active-status"
import { usePermissionContext } from "@/lib/provider/permission-context"


export default function DoctorList() {

    const [list, setList] = useState<DoctorListItem[]>([])

    async function search(form:DoctorSearch) {
        const result = await doctorClient.search(form)
        setList(result)
    }

    useEffect(() => {
        search({})
    }, [setList])

    return (
        <div className="space-y-4">
            <SearchForm onSearch={search} />
            <ListView list={list} />
        </div>
    )
}

function SearchForm({onSearch} : {onSearch : (form:DoctorSearch) => void}) {

    const [departments, setDepartments] = useState<DepartmentListItem[]>([])
    const { permission } = usePermissionContext()
    const canWrite = permission === 'Write' || permission === 'Modify' || permission === 'Delete'

    const form = useForm<DoctorSearch>({
        defaultValues: {
            departmentId: "",
            deleted: "",
            keyword: ""
        }
    })

    useEffect(() => {
        loadOptions()
    }, [setDepartments])

    async function loadOptions() {
        const result = await departmentClient.search({deleted: "false"})
        setDepartments(result)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">

                <FormsSelect control={form.control} path="departmentId" label="Department" options={[
                    {key: "-1", value: "Search All"},
                    ...(departments.map(a => ({key: String(a.id), value : a.name})))
                ]} />

                <FormsSelect control={form.control} path="deleted" label="Status" options={[
                    {key: "-1", value: "Search All"},
                    {key: "false", value: "Active"},
                    {key: "true", value: "Deleted"}
                ]} />

                <FormsInput control={form.control} path="keyword" label="Keyword" placeholder="Search Keyword" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>

                    {canWrite && 
                        <Button type="button" variant="destructive" asChild>
                            <Link href="/staff/doctor/create">
                                <Plus /> Add New
                            </Link>
                        </Button>
                    }
                </div>
            </form>
        </Form>
    )
}

function ListView({list} : {list: DoctorListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Modified At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {list.map(item => 
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>
                            <ActiveStatus deleted={item.deleted} />
                        </TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>{item.modifiedAt}</TableCell>
                        <TableCell>
                            <Link href={`/staff/doctor/${item.id}`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}