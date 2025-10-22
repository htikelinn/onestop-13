'use server'

import { ModificationResult } from ".."
import { safeCreate, safeUpdate, secureRequest } from "../rest-clients"
import { queryString, } from "../utils"
import { RoleDetails, RoleForm, RoleListItem, RoleSearch } from "./role.model"

const ENDPOINT = "staff/role"

export async function search(form: RoleSearch) : Promise<RoleListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number | string):Promise<RoleDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}


export async function create(form: RoleForm): Promise<ModificationResult> {
    return await safeCreate(ENDPOINT, JSON.stringify(form))
}

export async function update(id: number | string, form: RoleForm) : Promise<ModificationResult> {
    return await safeUpdate(`${ENDPOINT}/${id}`, JSON.stringify(form))
}
