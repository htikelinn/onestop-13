'use server'

import { ModificationResult } from ".."
import { fetchWithAuth, queryString } from "../rest-client.utils"
import { DepartmentDetails, DepartmentForm, DepartmentListItem, DepartmentSearch } from "./department.model"

const ENDPOINT = "staff/department"

export async function search(form: DepartmentSearch): Promise<DepartmentListItem[]> {
    const response = await fetchWithAuth(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<DepartmentDetails> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: DepartmentForm): Promise<ModificationResult> {
    const response = await fetchWithAuth(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number, form: DepartmentForm) : Promise<ModificationResult> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    return await response.json()
}