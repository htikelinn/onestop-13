'use client'

import { Form } from "@/components/ui/form"
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"
import { AppointmentSearch } from "@/lib/model/appointment.model"
import { useForm } from "react-hook-form"

export default function AppointmentList() {

    return (
        <>

        </>
    )
}

function SearchForm() {

    const form = useForm<AppointmentSearch>()

    return (
        <Form {...form}>
            <form></form>
        </Form>
    )
}

function SearchResult() {
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