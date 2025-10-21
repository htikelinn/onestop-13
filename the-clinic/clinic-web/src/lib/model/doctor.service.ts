'use server'

import { ModificationResult } from ".."
import { secureRequest, safeCreate, safeUpdate } from "../rest-clients"
import { queryString } from "../utils"
import { DoctorDetails, DoctorForm, DoctorListItem, DoctorSearch } from "./doctor.model"

const ENDPOINT = "staff/doctor"

export async function search(form: DoctorSearch) : Promise<DoctorListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<DoctorDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: DoctorForm): Promise<ModificationResult> {
    return await safeCreate(ENDPOINT, JSON.stringify(form))
}

export async function update(id: number, form: DoctorForm) : Promise<ModificationResult> {
    return await safeUpdate(`${ENDPOINT}/${id}`, JSON.stringify(form))
}