'use server'

import { ModificationResult } from ".."
import { secureRequest } from "../rest-clients"
import { queryString, safeCreate, safeUpdate } from "../utils"
import { RoleDetails, RoleForm, RoleListItem, RoleSearch } from "./role.model"

const ENDPOINT = "staff/employee"

export async function search(form: RoleSearch) : Promise<RoleListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<RoleDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}


export async function create(form: RoleForm): Promise<ModificationResult> {
    return await safeCreate(ENDPOINT, JSON.stringify(form))
}

export async function update(id: number, form: RoleForm) : Promise<ModificationResult> {
    return await safeUpdate(`${ENDPOINT}/${id}`, JSON.stringify(form))
}
