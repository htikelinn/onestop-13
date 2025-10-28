'use client'

import Loading from "@/components/app/loading"
import Pagination from "@/components/app/pagination"
import { Form } from "@/components/ui/form"
import { PageResult } from "@/lib"
import { safeCall } from "@/lib/action-utils"
import { AppointmentListItem, AppointmentSearch } from "@/lib/model/appointment.model"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import * as appointmentClient from "@/lib/model/appointment.service"
import * as doctorClient from "@/lib/model/doctor.service"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DoctorListItem } from "@/lib/model/doctor.model"
import FormsSelect, { SelectOption } from "@/components/forms/forms-select"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, Search } from "lucide-react"
import Link from "next/link"
import { usePermissionContext } from "@/lib/provider/permission-context"

export default function AppointmentListView()  {

    const [page, setPage] = useState<PageResult<AppointmentListItem>>()

    async function search(form: AppointmentSearch) {
        safeCall(async () => {
            const result = await appointmentClient.search(form)
            setPage(result)
        })
    }

    useEffect(() => {
        search({})
    }, [])

    return (
        <section className="space-y-4">
            <SearchForm onSearch={search} />
            <SearchResultPage page={page} />
        </section>
    )
}

function SearchForm({onSearch} : {onSearch: (form: AppointmentSearch) => void}) {

    const [doctors, setDoctors] = useState<DoctorListItem[]>([])
    const doctorOptions:SelectOption[] = doctors.map(a => ({key: String(a.id), value : a.name}))
    
    useEffect(() => {
        async function load() {
            const result = await doctorClient.search({deleted: "false"})
            setDoctors(result)
        }

        load()
    }, [setDoctors])

    const [statusOptions, setStatusOptions] = useState<SelectOption[]>([])
    
    useEffect(() => {
        async function load() {
            const result = await appointmentClient.getAtatus()
            setStatusOptions(result)
        }

        load()
    }, [setStatusOptions])

    const form = useForm<AppointmentSearch>({defaultValues: {
        doctorId: "",
        status: "",
        from: "",
        to: "",
        keyword: "",
        page: "0",
        size: "10"
    }})

    const { permission } = usePermissionContext()
    const canWrite = permission === 'Write' || permission === 'Modify' || permission === 'Delete'

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <FormsSelect control={form.control} path="status" label="Status" options={statusOptions} className="w-[160px]" />
                <FormsSelect control={form.control} path="doctorId" label="Doctor" options={doctorOptions} className="w-[180px]" />
                <FormsInput control={form.control} path="from" type="date" label="From Date" />
                <FormsInput control={form.control} path="keyword" label="Keyword" placeholder="Search Keyword" />

                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>

                    {canWrite && 
                        <Button type="button" variant={'destructive'} asChild>
                            <Link href={''}>
                                <Plus /> Create
                            </Link>
                        </Button>                    
                    }
                </div>
            </form>
        </Form>
    )
}

function SearchResultPage({page} : {page? : PageResult<AppointmentListItem>}) {

    if(!page) {
        return (
            <Loading data="Appointment" />
        )
    }

    const {list, ...pageInfo} = page

    return (
        <>
            <SearchResult list={list} />
            <Pagination info={pageInfo} />
        </>
    )
}

function SearchResult({list} : {list : AppointmentListItem []}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Appoint At</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {list.map((item, index) => 
                <TableRow key={index}>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.doctor}</TableCell>
                    <TableCell>{item.scheduleDate}</TableCell>
                    <TableCell>{item.scheduleTime}</TableCell>
                    <TableCell>{item.tokenNumber}</TableCell>
                    <TableCell>{item.patient}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.appointAt}</TableCell>
                    <TableCell>
                        <Link href={`/staff/appointment/${item.code}`}>
                            <ArrowRight className="size-4" />
                        </Link>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}