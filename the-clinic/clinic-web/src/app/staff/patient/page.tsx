'use client'

import Pagination from "@/components/app/pagination"
import { Form } from "@/components/ui/form"
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"
import { PageResult } from "@/lib"
import { PatientListItem, PatientSearch } from "@/lib/model/patient.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function PatientList() {

    const [result, setResult] = useState<PageResult<PatientListItem>>()
    const list = result?.list || []
    const pageInfo = result?.pageInfo

    async function search(form: PatientSearch) {

    }

    useEffect(() => {
        search({})
    }, [setResult])

    return (
        <div>
            <SearchForm onSearch={search} />
            <SearchResult list={list} />
            <Pagination info={pageInfo} />
        </div>
    )
}

function SearchForm({onSearch} : {onSearch : (form: PatientSearch) => void}) {

    const form = useForm<PatientSearch>()

    return (
        <Form {...form}>
            <form></form>
        </Form>
    )
}

function SearchResult({list} : {list : PatientListItem[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>

                </TableRow>
            </TableHeader>

            <TableBody>
                
            </TableBody>
        </Table>
    )
}