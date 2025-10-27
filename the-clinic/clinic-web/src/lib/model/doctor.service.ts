'use server'

import { ModificationResult } from ".."
import { secureRequest } from "../rest-clients"
import { POST_INIT, PUT_INIT, queryString } from "../utils"
import { DoctorDetails, DoctorForm, DoctorListItem, DoctorSearch } from "./doctor.model"

const ENDPOINT = "staff/doctor"

export async function search(form: DoctorSearch) : Promise<DoctorListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number | string):Promise<DoctorDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: DoctorForm): Promise<ModificationResult<number>> {
    const response = await secureRequest(ENDPOINT, {
        ...POST_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number | string, form: DoctorForm) : Promise<ModificationResult<number>> {
    const response = await secureRequest(`${ENDPOINT}/${id}`, {
        ...PUT_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}