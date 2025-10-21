'use server'

import { ModificationResult } from ".."
import { secureRequest, safeCreate, safeUpdate  } from "../rest-clients"
import { queryString } from "../utils"
import { DepartmentDetails, DepartmentForm, DepartmentListItem, DepartmentSearch } from "./department.model"

const ENDPOINT = "staff/department"

export async function search(form: DepartmentSearch): Promise<DepartmentListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number | string):Promise<DepartmentDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: DepartmentForm): Promise<ModificationResult> {
    return await safeCreate(ENDPOINT, JSON.stringify(form))
}

export async function update(id: number | string, form: DepartmentForm) : Promise<ModificationResult> {
    return await safeUpdate(`${ENDPOINT}/${id}`, JSON.stringify(form))
}