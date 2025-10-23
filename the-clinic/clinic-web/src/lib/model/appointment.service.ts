'use server'

import { format } from "date-fns";
import { AppointmentCancelForm, AppointmentDetails, AppointmentForm, AppointmentListItem, PublicAppointmentForm } from "./appointment.model";
import { DUMMY_PAGE, ModificationResult, PageResult } from "..";

export async function search(form: Record<string, string | string [] | undefined>):Promise<PageResult<AppointmentListItem>> {
    console.log(form)
    return {
        list: DUMMY_DATA,
        ...DUMMY_PAGE
    }
}

export async function findById(id: string):Promise<AppointmentDetails | undefined> {
    
    const item = DUMMY_DATA.filter(a => a.id == id).pop()

    if(item) {
        return {
            ...item, 
            status: 'Canceld',
            chiefComplain : "Head Ache",
            remark: "Doctor has urgent emergency.",
            updatedAt: format(new Date, "yyyy-MM-dd HH:mm"),
            updatedBy: "Office",
            createdBy: "Customer"
        }
    }
}

export async function createPublic(form: PublicAppointmentForm):Promise<ModificationResult> {
    console.log(form)
    return {
        success: true,
        message: "AP0001"
    }
}

export async function create(form: AppointmentForm) {
    console.log(form)
    return {
        success: true,
        message: "AP0001"
    }
}

export async function update(id: string, form: AppointmentForm) {
    console.log(form)
    return {
        success: true,
        message: id
    }
}

export async function cancel(id: string, form: AppointmentCancelForm) {    
    console.log(form)
    return {
        success: true,
        message: "AP0001"
    }
}

const DUMMY_DATA:AppointmentListItem[] = [
    {
        id: "1001",
        scheduleDate: format(Date.now(), "yyyy-MM-dd"),
        status: "Applied",
        appointAt: format(Date.now(), "yyyy-MM-dd HH:mm"),
        department: "GP",
        doctor: "U Ko Ko",
        patient: "Thidar Aung",
        phone: "09881717161",
        scheduleTime: "10:00 am",
        tokenNo: 10
    }
]