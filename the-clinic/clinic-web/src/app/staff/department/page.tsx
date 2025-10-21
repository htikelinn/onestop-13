'use client'

import { DepartmentListItem, DepartmentSearch } from "@/lib/model/department.model"
import { useEffect, useState } from "react"
import * as departmentClient from "@/lib/model/department.service"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import FormsSelect from "@/components/forms/forms-select"
import { ArrowRight, Check, FormInput, Plus, Search } from "lucide-react"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DepartmentManagement() {

    const [list, setList] = useState<DepartmentListItem[]>([])

    useEffect(() => {
        async function load() {
            await search({})
        }

        load()
    }, [setList])

    async function search(form:DepartmentSearch) {
        if(form.deleted == '-1') {
            delete form.deleted
        }
        const result = await departmentClient.search(form)
        setList(result)
    }

    return (
        <div className="space-y-4">
            <SearchForm onSearch={search} />
            <ListView data={list} />
        </div>
    )
}

function SearchForm({onSearch} : {onSearch : (form:DepartmentSearch) => void}) {
    
    const form = useForm<DepartmentSearch>({
        defaultValues: {
            deleted: "-1",
            keyword: ""
        }
    })
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <FormsSelect control={form.control} path="deleted" label="Status" options={[
                    {key: "-1", value: "All Status"},
                    {key: "false", value: "Active"},
                    {key: "true", value: "Deleted"},
                ]} />

                <FormsInput control={form.control} path="keyword" label="Keyword" placeholder="Search Keyword" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search/> Search
                    </Button>

                    <Button asChild variant={'destructive'} type="button">
                        <Link href={"/staff/department/create"}>
                            <Plus /> Add New
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

function ListView({data} : {data : DepartmentListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Doctors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((item, index) => 
                    <TableRow key={index}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.doctors}</TableCell>
                        <TableCell>{item.deleted ? "" : <Check className="size-4" />}</TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                        <TableCell>{item.modifiedAt}</TableCell>
                        <TableCell>
                            <Link href={`/staff/department/${item.id}`}>
                                <ArrowRight className="size-4" />
                            </Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}