'use client'

import { PublicAppointmentForm, PublicAppointmentSchema } from "@/lib/model/appointment.model"
import { DoctorListItem, PublicSchedule } from "@/lib/model/doctor.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import * as publicClient from '@/lib/model/public-home.service'
import { safeCall } from "@/lib/action-utils"
import { Form } from "@/components/ui/form"
import FormsSelect from "@/components/forms/forms-select"
import FormsInput from "../forms/forms-input"
import FormsTextarea from "../forms/forms-textarea"
import { Button } from "../ui/button"
import { Check } from "lucide-react"

export default function CreateAppointmentForAnonymousUser() {

    const form = useForm({
        resolver: zodResolver(PublicAppointmentSchema),
        defaultValues: {
            doctorId: "",
            scheduleDate: "",
            scheduleTime: "",
            patientName: "",
            dateOfBirth: "",
            phone: "",
            chiefComplain: ""
        }
    })

    const searchParams = useSearchParams()
    const doctorId = searchParams.get("doctorId")
    const scheduleDate = searchParams.get("scheduleDate")
    const scheduleTime = searchParams.get("scheduleTime")

    useEffect(() => {
        form.setValue("doctorId", doctorId || "")
        form.setValue("scheduleDate", scheduleDate || "")
        form.setValue("scheduleTime", scheduleTime || "")
    }, [doctorId, scheduleDate, scheduleTime, form])

    const [doctors, setDoctors] = useState<DoctorListItem[]>([])
    const [schedules, setSchedules] = useState<PublicSchedule[]>([])
    
    const scheduleMap = schedules.reduce((a, b) => {
        const times = a.get(b.date) || []
        times.push(b.scheduleTime)
        a.set(b.date, times)
        return a
    }, new Map<string, string[]>)

    const dates = Array.from(scheduleMap.keys()).sort()

    const [times, setTimes] = useState<string[]>([])

    useEffect(() => {
        async function load() {
            const result = await publicClient.getDoctorsForHome()
            setDoctors(result)
        }

        load()
    }, [setDoctors])

    const watchedDoctorId = form.watch('doctorId')
    useEffect(() => {
        async function load() {
            setSchedules([])

            if(watchedDoctorId) {
                const result = await publicClient.findScheduleForDoctor(watchedDoctorId)
                setSchedules(result)
            }
        }
        load()
    }, [watchedDoctorId, setSchedules])

    const watchedDate = form.watch('scheduleDate')

    useEffect(() => {
        setTimes([])
        if(watchedDate) {
            setTimes(scheduleMap.get(watchedDate) || [])
        }
    }, [watchedDate, setTimes])

    const router = useRouter()

    async function save(form: PublicAppointmentForm) {
        safeCall(async () => {
            const result = await publicClient.takeAppointment(form)
            router.push(`/appointment/${result.id}`)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} className="grid grid-cols-3 gap-4">
                <FormsSelect control={form.control} path="doctorId" label="Doctor" options={doctors.map(item => ({key : String(item.id), value: `${item.title} ${item.name}`}))} />
                <FormsSelect control={form.control} path="scheduleDate" label="Date" options={dates.map(item => ({key : item, value: item}))}  className="col-start-1"/>
                <FormsSelect control={form.control} path="scheduleTime" label="Time" options={times.map(item => ({key : item, value: item}))} />

                <FormsInput control={form.control} path="patientName" label="Patient Name" className="col-start-1" />
                <FormsInput control={form.control} path="dateOfBirth" label="Date of Birth" type="date" />
                <FormsInput control={form.control} path="phone" label="Phone Number" type="tel" />

                <FormsTextarea control={form.control} path="chiefComplain" label="Reason to visit" className="col-span-3" />

                <div>
                    <Button type="submit">
                        <Check /> Confirmed
                    </Button>
                </div>
            </form>
        </Form>
    )
}