'use server'

import { format } from "date-fns";
import { AppointmentCancelForm, AppointmentDetails, AppointmentForm, AppointmentListItem, AppointmentSearch } from "./appointment.model";
import { ModificationResult, PageResult } from "..";
import { secureRequest } from "../rest-clients";
import { POST_INIT, PUT_INIT, queryString } from "../utils";

const ENDPOINT = "staff/appointment"

export async function search(form: AppointmentSearch):Promise<PageResult<AppointmentListItem>> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: string):Promise<AppointmentDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}}`)
    return await response.json()
}

export async function create(form: AppointmentForm):Promise<ModificationResult<string>> {
    const response = await secureRequest(ENDPOINT, {
        ...POST_INIT, 
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function update(id: string, form: AppointmentForm) {
    const response = await secureRequest(`${ENDPOINT}/${id}`, {
        ...PUT_INIT, 
        body: JSON.stringify(form)
    })
    return await response.json()
}

export async function cancel(id: string, form: AppointmentCancelForm) {    
    const response = await secureRequest(`${ENDPOINT}/${id}/cancel`, {
        ...PUT_INIT, 
        body: JSON.stringify(form)
    })
    return await response.json()
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