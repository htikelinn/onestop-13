'use client'

import { DoctorDetails } from "@/lib/model/doctor.model"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import * as doctorClient from '@/lib/model/doctor.service'

export default function DoctorDetailsView() {

    const {id} = useParams()
    const [details, setDetails] = useState<DoctorDetails>()

    useEffect(() => {
        async function load() {
            if(id) {
                const result = await doctorClient.findById(id as string)
                setDetails(details)
            }
        }

        load()
    }, [id, setDetails])

    return (
        <></>
    )
}