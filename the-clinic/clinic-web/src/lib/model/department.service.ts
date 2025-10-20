'use server'

import { ModificationResult } from ".."
import { secureRequest } from "../rest-clients"
import { POST_INIT, queryString } from "../utils"
import { DepartmentDetails, DepartmentForm, DepartmentListItem, DepartmentSearch } from "./department.model"

const ENDPOINT = "staff/department"

export async function search(form: DepartmentSearch): Promise<DepartmentListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number):Promise<DepartmentDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: DepartmentForm): Promise<ModificationResult> {
    const response = await secureRequest(ENDPOINT, {
        ...POST_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number, form: DepartmentForm) : Promise<ModificationResult> {
    const response = await secureRequest(`${ENDPOINT}/${id}`, {
        ...POST_INIT,
        body: JSON.stringify(form)
    })
    return await response.json()
}