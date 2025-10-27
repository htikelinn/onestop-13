'use server'

import { ModificationResult } from "..";
import { publicRequest } from "../rest-clients";
import { POST_INIT } from "../utils";
import { PublicAppointmentForm } from "./appointment.model";
import { DepartmentDetails, DepartmentListItem } from "./department.model";
import { DoctorListItem, PublicDoctorDetails, PublicSchedule } from "./doctor.model";

export async function getDepartmentsForHome():Promise<DepartmentListItem[]> {
    const response = await publicRequest("anonymous/department")
    return await response.json()
}

export async function getDepartmentDetails(id: number | string):Promise<DepartmentDetails> {
    const response = await publicRequest(`anonymous/department/${id}`)
    return await response.json()
}

export async function getDoctorsForHome():Promise<DoctorListItem[]> {
    const response = await publicRequest("anonymous/doctor")
    return await response.json()
}

export async function getDoctorDetails(id: number | string):Promise<PublicDoctorDetails> {
    const response = await publicRequest(`anonymous/doctor/${id}`)
    return await response.json()
}

export async function findScheduleForDoctor(id: string):Promise<PublicSchedule[]> {
    const response = await publicRequest(`anonymous/doctor/${id}/schedules`)
    return await response.json()
}

export async function takeAppointment(form: PublicAppointmentForm):Promise<ModificationResult<string>> {
    const response = await publicRequest("anonymous/appointment", {
        ...POST_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}