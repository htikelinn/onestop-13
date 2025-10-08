'use client'

import FormsInput from "@/components/forms/forms-input"
import FormsSelect from "@/components/forms/forms-select"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { AppointmentSearch, AppointmentStatusList } from "@/lib/model/search/appointment-search"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function SearchForm({params} : {params? : {[key:string] : string | undefined}}) {
    
    const router = useRouter()
    const statusOptions = AppointmentStatusList.map(a => ({key: a, value : a}))
    statusOptions.unshift({key: "all", value: "Search All"})

    const form = useForm<AppointmentSearch>({
        defaultValues: {
            status: params?.status || 'all',
            dateFrom: params?.dateFrom || '',
            dateTo: params?.dateTo || '',
            keyword: params?.keyword || ''
        }
    })

    function search(form: AppointmentSearch) {
        const params = new URLSearchParams
        if(form.status) {
            params.append("status", form.status)
        }
        if(form.dateFrom) {
            params.append("dateFrom", form.dateFrom)
        }
        if(form.dateTo) {
            params.append("dateTo", form.dateTo)
        }
        if(form.keyword) {
            params.append("keyword", form.keyword)
        }

        router.replace(`/patient/appointments?${params.toString()}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(search)} className="flex gap-4 items-end">
                <FormsSelect control={form.control} path="status" 
                    label="Status" options={statusOptions} />

                <FormsInput control={form.control} path="dateFrom" 
                    label="Date From" type="date" />

                <FormsInput control={form.control} path="dateTo" 
                    label="Date To" type="date" />

                <FormsInput control={form.control} path="keyword"
                    label="Keyword" placeholder="Search Keyword" /> 

                <div className="space-x-2">
                    <Button type="submit">
                        <Search /> Search
                    </Button>    

                    <Button type="button" asChild variant={'destructive'}>
                        <Link href="">
                            <Plus /> Add New
                        </Link>
                    </Button>
                </div>   

            </form>
        </Form>
    )
}