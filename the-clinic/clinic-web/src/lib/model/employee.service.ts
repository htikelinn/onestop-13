'use server'

import { ModificationResult } from ".."
import { fetchWithAuth } from "../rest-client.utils"
import { queryString } from "../utils"
import { EmployeeDetails, EmployeeForm, EmployeeListItem, EmployeeSearch } from "./employee.model"

const ENDPOINT = "staff/employee"

export async function search(form: EmployeeSearch) : Promise<EmployeeListItem[]> {
    const response = await fetchWithAuth(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<EmployeeDetails> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: EmployeeForm): Promise<ModificationResult> {
    const response = await fetchWithAuth(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number, form: EmployeeForm) : Promise<ModificationResult> {
    const response = await fetchWithAuth(`${ENDPOINT}/${id}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(form)
    })
    return await response.json()
}