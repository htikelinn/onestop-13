'use server'

import { ModificationResult } from ".."
import { secureRequest  } from "../rest-clients"
import { POST_INIT, PUT_INIT, queryString, } from "../utils"
import { PatientDetails, PatientForm, PatientListItem, PatientSearch } from "./patient.model"

const ENDPOINT = "staff/patient"

export async function search(form: PatientSearch) : Promise<PatientListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number | string):Promise<PatientDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: PatientForm): Promise<ModificationResult<number>> {
    const response = await secureRequest(ENDPOINT, {
        ...POST_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number | string, form: PatientForm) : Promise<ModificationResult<number>> {
    const response = await secureRequest(`${ENDPOINT}/${id}`, {
        ...PUT_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}