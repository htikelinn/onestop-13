'use server'

import { ModificationResult, PageResult } from ".."
import { secureRequest } from "../rest-clients"
import { POST_INIT, PUT_INIT, queryString,  } from "../utils"
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

export async function create(form: EmployeeForm): Promise<ModificationResult<number>> {
    const response = await secureRequest(ENDPOINT, {
        ...POST_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number | string, form: EmployeeForm) : Promise<ModificationResult<number>> {
    const response = await secureRequest(`${ENDPOINT}/${id}`, {
        ...PUT_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}