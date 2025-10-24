'use server'

import { publicRequest } from "../rest-clients";
import { DepartmentDetails, DepartmentListItem } from "./department.model";
import { DoctorDetails, DoctorListItem, Schedule } from "./doctor.model";

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

export async function getDoctorDetails(id: number | string):Promise<DoctorDetails> {
    const response = await publicRequest(`anonymous/doctor/${id}`)
    return await response.json()
}

export async function findScheduleForDoctor(id: string):Promise<Schedule[]> {
    const response = await publicRequest(`anonymous/doctor/${id}/schedules`)
    return await response.json()
}