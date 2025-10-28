'use server'

import { AppointmentCancelForm, AppointmentDetails, AppointmentListItem, AppointmentSearch } from "./appointment.model";
import { PageResult } from "..";
import { secureRequest } from "../rest-clients";
import { PUT_INIT, queryString } from "../utils";
import { SelectOption } from "@/components/forms/forms-select";

const ENDPOINT = "staff/appointment"

export async function getAtatus():Promise<SelectOption[]> {
    const response = await secureRequest(`${ENDPOINT}/status`)
    return await response.json()
}

export async function search(form: AppointmentSearch):Promise<PageResult<AppointmentListItem>> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: string):Promise<AppointmentDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function cancel(id: string, form: AppointmentCancelForm) {    
    const response = await secureRequest(`${ENDPOINT}/${id}/cancel`, {
        ...PUT_INIT, 
        body: JSON.stringify(form)
    })
    return await response.json()
}