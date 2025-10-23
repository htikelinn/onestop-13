'use client'

import { EmployeeDetails } from "@/lib/model/employee.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as employeeClient from '@/lib/model/employee.service'

export default function EmployeeDetailsView() {

    const {id} = useParams()
    const [details, setDetails] = useState<EmployeeDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await employeeClient.findById(id as string)
                setDetails(result)
            }
        }

        load()
    }, [id, setDetails])

    return (
        <pre>{JSON.stringify(details, null, 2)}</pre>
    )
}