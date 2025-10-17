'use server'

import { ModificationResult } from ".."
import { fetchWithAuth, queryString } from "../rest-client.utils"
import { RoleDetails, RoleForm, RoleListItem, RoleSearch } from "./role.model"

const ENDPOINT = "staff/employee"

export async function search(form: RoleSearch) : Promise<RoleListItem[]> {
    const response = await fetchWithAuth(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<RoleDetails> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: RoleForm): Promise<ModificationResult> {
    const response = await fetchWithAuth(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number, form: RoleForm) : Promise<ModificationResult> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    return await response.json()
}