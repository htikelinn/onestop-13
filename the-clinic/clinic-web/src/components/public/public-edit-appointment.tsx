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
            chiefComplaint: ""
        }
    })

    const searchParams = useSearchParams()
    const doctorId = searchParams.get("doctorId")
    const scheduleDate = searchParams.get("scheduleDate")
    const scheduleTime = searchParams.get("scheduleTime")

    const [initDoctorId, setInitDoctorId] = useState(false) 
    const [initScheduleDate, setInitScheduleDate] = useState(false) 
    const [initScheduleTime, setInitScheduleTime] = useState(false) 

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

    useEffect(() => {
        if(!initDoctorId && doctors.length > 0 && doctorId) {
            form.setValue('doctorId', doctorId)
            setInitDoctorId(true)
        }
    }, [doctorId, doctors, initDoctorId, setInitDoctorId]) 

    const watchedDoctorId = form.watch('doctorId')
    useEffect(() => {
        async function load() {
            setSchedules([])
            
            form.setValue("scheduleDate", "")
            form.setValue("scheduleTime", "")

            if(watchedDoctorId) {
                const result = await publicClient.findScheduleForDoctor(watchedDoctorId)
                setSchedules(result)
            }
        }
        load()
    }, [watchedDoctorId, setSchedules])

    useEffect(() => {
        if(!initScheduleDate && dates.length > 0 && scheduleDate) {
            form.setValue('scheduleDate', scheduleDate)
            setInitScheduleDate(true)
        } 
    }, [scheduleDate, dates, initScheduleDate, setInitScheduleDate])

    const watchedDate = form.watch('scheduleDate')

    useEffect(() => {
        setTimes([])
        form.setValue("scheduleTime", "")

        if(watchedDate) {
            setTimes(scheduleMap.get(watchedDate) || [])
        }
    }, [watchedDate, setTimes])

    useEffect(() => {
        if(!initScheduleTime && times.length > 0, scheduleTime) {
            form.setValue('scheduleTime', scheduleTime)
            setInitScheduleTime(true)

        }
    }, [times, scheduleTime, initScheduleTime, setInitScheduleTime])

    const router = useRouter()

    async function save(form: PublicAppointmentForm) {
        safeCall(async () => {
            const result = await publicClient.takeAppointment(form)
            router.push(`/appointment/${result.id}`)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} className="grid grid-cols-3 gap-4 items-start">
                <FormsSelect control={form.control} path="doctorId" label="Doctor" options={doctors.map(item => ({key : String(item.id), value: `${item.title} ${item.name}`}))} />
                <FormsSelect control={form.control} path="scheduleDate" label="Date" options={dates.map(item => ({key : item, value: item}))}  className="col-start-1"/>
                <FormsSelect control={form.control} path="scheduleTime" label="Time" options={times.map(item => ({key : item, value: item}))} />

                <FormsInput control={form.control} path="patientName" label="Patient Name" className="col-start-1" />
                <FormsInput control={form.control} path="dateOfBirth" label="Date of Birth" type="date" />
                <FormsInput control={form.control} path="phone" label="Phone Number" type="tel" />

                <FormsTextarea control={form.control} path="chiefComplaint" label="Reason to visit" className="col-span-3" />

                <div>
                    <Button type="submit">
                        <Check /> Confirmed
                    </Button>
                </div>
            </form>
        </Form>
    )
}