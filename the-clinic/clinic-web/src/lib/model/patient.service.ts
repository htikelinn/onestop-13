'use server'

import { ModificationResult } from ".."
import { secureRequest, safeCreate, safeUpdate  } from "../rest-clients"
import { queryString, } from "../utils"
import { PatientDetails, PatientForm, PatientListItem, PatientSearch } from "./patient.model"

const ENDPOINT = "staff/patient"

export async function search(form: PatientSearch) : Promise<PatientListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<PatientDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: PatientForm): Promise<ModificationResult> {
    return await safeCreate(ENDPOINT, JSON.stringify(form))
}

export async function update(id: number, form: PatientForm) : Promise<ModificationResult> {
    return await safeUpdate(`${ENDPOINT}/${id}`, JSON.stringify(form))
}