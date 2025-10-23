'use server'

import { ModificationResult, PageResult } from ".."
import { secureRequest, safeCreate, safeUpdate } from "../rest-clients"
import { queryString,  } from "../utils"
import { EmployeeDetails, EmployeeForm, EmployeeListItem, EmployeeSearch } from "./employee.model"

const ENDPOINT = "staff/employee"

export async function search(form: EmployeeSearch) : Promise<PageResult<EmployeeListItem>> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number | string):Promise<EmployeeDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}

export async function create(form: EmployeeForm): Promise<ModificationResult> {
    return await safeCreate(ENDPOINT, JSON.stringify(form))
}

export async function update(id: number | string, form: EmployeeForm) : Promise<ModificationResult> {
    return await safeUpdate(`${ENDPOINT}/${id}`, JSON.stringify(form))
}