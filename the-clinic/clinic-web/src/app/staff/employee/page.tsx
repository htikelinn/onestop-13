'use client'

import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmployeeListItem, EmployeeSearch } from "@/lib/model/employee.model"
import { RoleListItem } from "@/lib/model/role.model"
import { ArrowRight, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import * as roleClient from '@/lib/model/role.service'
import * as employeeClient from '@/lib/model/employee.service'
import ActiveStatus from "@/components/app/active-status"
import { PagerInfo } from "@/lib"
import Pagination from "@/components/app/pagination"

export default function EmployeeList() {

    const [list, setList] = useState<EmployeeListItem[]>([])
    const [pager, setPager] = useState<PagerInfo>()

    async function search(form: EmployeeSearch) {
        if(form.roleId == "-1") {
            delete form.roleId
        }

        if(form.deleted == "-1") {
            delete form.deleted
        }

        const {list, ...pager} = await employeeClient.search(form)
        setList(list)
        setPager(pager)
    }

    useEffect(() => {
        search({})
    }, [setList])

    return (
        <div className="space-y-4">
            <SearchForm onSearch={search} />
            <SearchResult list={list} />
            {pager && pager.totalPage > 1 && <Pagination info={pager} />}
        </div>
    )
}

function SearchForm({onSearch} : {onSearch : (form:EmployeeSearch) => void}) {

    const form = useForm<EmployeeSearch>()
    const [roles, setRoles] = useState<RoleListItem[]>([])

    useEffect(() => {
        async function loadRoles() {
            const result = await roleClient.search({deleted : "false"})
            setRoles(result)

            console.log(result)
        }
        loadRoles()
    }, [setRoles])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">

                <FormsSelect control={form.control} path="roleId" label="Role" options={[
                    {key: "-1", value: "Search All"},
                    ...(roles.map(a => ({key : String(a.id), value : a.name})))
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

                    <Button type="button" variant="destructive" asChild>
                        <Link href="/staff/employee/create">
                            <Plus /> Add New
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}

function SearchResult({list} : {list : EmployeeListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assigned At</TableHead>
                    <TableHead>Retired At</TableHead>
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
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.assignAt}</TableCell>
                    <TableCell>{item.retiredAt}</TableCell>
                    <TableCell>
                        <ActiveStatus deleted={item.deleted} />
                    </TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>{item.modifiedAt}</TableCell>
                    <TableCell>
                        <Link href={`/staff/employee/${item.id}`}>
                            <ArrowRight className="size-4" />
                        </Link>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}