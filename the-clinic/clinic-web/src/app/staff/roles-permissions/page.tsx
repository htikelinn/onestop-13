'use client'

import { RoleListItem, RoleSearch } from "@/lib/model/role.model"
import { useEffect, useState } from "react"

import * as roleClient from '@/lib/model/role.service'
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import FormsSelect from "@/components/forms/forms-select"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ActiveStatus from "@/components/app/active-status"
import { usePermissionContext } from "@/lib/provider/permission-context"

export default function RoleAndPermissionManagement() {

    const [list, setList] = useState<RoleListItem[]>([])

    async function search(form:RoleSearch) {
        const result = await roleClient.search(form)
        setList(result)
    }

    useEffect(() => {
        search({})
    }, [setList])

    return (
        <div className="space-y-4">
            <SearchForm onSearch={search} /> 
            <SearchResult list={list} />
        </div>
    )
}

function SearchForm({onSearch} : {onSearch : (form:RoleSearch) => void}) {

    
    const form = useForm<RoleSearch>({
        defaultValues: {
            deleted: undefined,
            keyword: ""
        }
    })

    const { permission } = usePermissionContext()
    const canWrite = permission === 'Write' || permission === 'Modify' || permission === 'Delete'

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <FormsSelect control={form.control} path="deleted" label="Status" options={[
                    {key : "-1", value: "Search All"},
                    {key : "false", value: "Active"},
                    {key : "true", value: "Deleted"},
                ]} />

                <FormsInput control={form.control} path="keyword" label="Keyword" placeholder="Search Keyword" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search/> Search
                    </Button>

                    {canWrite && 
                        <Button type="button" variant='destructive' asChild>
                            <Link href={"/staff/roles-permissions/create"}>
                                <Plus /> Add New
                            </Link>
                        </Button>
                    }
                </div>
            </form>
        </Form>
    )
}

function SearchResult({list} : {list : RoleListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Modified At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {list.map((item, index) => 
                <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                        <ActiveStatus deleted={item.deleted} />
                    </TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>{item.modifiedAt}</TableCell>
                    <TableCell>
                        <Link href={`/staff/roles-permissions/${item.id}`}>
                            <ArrowRight className="size-4" />
                        </Link>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}