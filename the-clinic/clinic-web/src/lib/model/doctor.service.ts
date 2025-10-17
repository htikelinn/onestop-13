'use server'

import { ModificationResult } from ".."
import { fetchWithAuth, queryString } from "../rest-client.utils"
import { DoctorDetails, DoctorForm, DoctorListItem, DoctorSearch } from "./doctor.model"

const ENDPOINT = "staff/doctor"

export async function search(form: DoctorSearch) : Promise<DoctorListItem[]> {
    const response = await fetchWithAuth(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<DoctorDetails> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: DoctorForm): Promise<ModificationResult> {
    const response = await fetchWithAuth(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number, form: DoctorForm) : Promise<ModificationResult> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    return await response.json()
}