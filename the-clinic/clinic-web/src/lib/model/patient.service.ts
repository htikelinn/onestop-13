'use server'

import { ModificationResult } from ".."
import { fetchWithAuth, queryString } from "../rest-client.utils"
import { PatientDetails, PatientForm, PatientListItem, PatientSearch } from "./patient.model"

const ENDPOINT = "staff/patient"

export async function search(form: PatientSearch) : Promise<PatientListItem[]> {
    const response = await fetchWithAuth(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<PatientDetails> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: PatientForm): Promise<ModificationResult> {
    const response = await fetchWithAuth(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number, form: PatientForm) : Promise<ModificationResult> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    return await response.json()
}