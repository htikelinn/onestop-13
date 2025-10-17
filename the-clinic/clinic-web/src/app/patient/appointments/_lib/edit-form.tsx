'use client'

import FormsDate from "@/components/forms/forms-date";
import FormsSelect from "@/components/forms/forms-select";
import { Form } from "@/components/ui/form";
import { AppointmentForm, AppointmentSchema } from "@/lib/model/appointment.model";
import { DoctorForHome, DoctorSchedule } from "@/lib/model/public-home.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as publicApi from '@/lib/model/public-home.service'
import { formatDate } from "date-fns";
import FormsTextarea from "@/components/forms/forms-textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function AppointmentEditForm({doctors} : {doctors : DoctorForHome[]}) {

    const form = useForm({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            doctorId: "",
            chiefComplain: "",
            scheduleDate: undefined,
            scheduleTime: undefined
        }
    })

    const doctorId = form.watch('doctorId')
    const scheduleDate = form.watch('scheduleDate')

    const [schedules, setSchedules] = useState<DoctorSchedule[]>([])
    const scheduleDates:Date[] = [... new Set(schedules.map(a => a.scheduleDate))]
    const [scheduleTimes, setScheduleTimes] = useState<string[]>([])

    useEffect(() => {

        async function loadSchedule() {
            setSchedules([])
            form.resetField('scheduleDate')

            if(doctorId) {
                const result = await publicApi.findScheduleForDoctor(doctorId)
                console.log(result)
                setSchedules(result)
            } 
        }

        loadSchedule()

    }, [form, doctorId])

    useEffect(() => {
        form.resetField('scheduleTime')

        if(scheduleDate) {
            const times = schedules.filter(a => formatDate(a.scheduleDate, "yyyyMMdd") === formatDate(scheduleDate, "yyyyMMdd"))
                .map(a => `${a.startTime} to ${a.endTime}`)
            setScheduleTimes(times)
        }
    }, [form, schedules,scheduleDate])

    function save(form: AppointmentForm) {
        console.log(form)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(save)} className="space-y-3">
                <FormsSelect control={form.control} path="doctorId" className="w-1/3"
                    label="Doctor" options={doctors.map(d => ({key: d.id, value: `${d.title} ${d.name}`}))} />

                <div className="flex gap-4">
                    <FormsDate control={form.control} path="scheduleDate" className="w-1/3"
                        label="Appoint Date" availableDates={scheduleDates} />
                    
                    <FormsSelect control={form.control} path="scheduleTime" className="w-1/3"
                        label="Schedule" options={scheduleTimes.map(a => ({key: a, value: a}))} />
                </div>

                <FormsTextarea control={form.control} path="chiefComplain"
                    label="Chief Complaint" />

                <Button type="submit">
                    <Save /> Take Appointment
                </Button>
            </form>
        </Form>
    )
}