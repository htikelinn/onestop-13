'use server'

import { ModificationResult } from ".."
import { secureRequest } from "../rest-clients"
import { POST_INIT, PUT_INIT, queryString, } from "../utils"
import { RoleDetails, RoleForm, RoleListItem, RoleSearch } from "./role.model"

const ENDPOINT = "staff/roles-permissions"

export async function search(form: RoleSearch) : Promise<RoleListItem[]> {
    const response = await secureRequest(`${ENDPOINT}?${queryString(form)}`)
    return await response.json()
}

export async function findById(id: number | string):Promise<RoleDetails> {
    const response = await secureRequest(`${ENDPOINT}/${id}`)
    return await response.json()
}


export async function create(form: RoleForm): Promise<ModificationResult<number>> {
    const response = await secureRequest(ENDPOINT, {
        ...POST_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}

export async function update(id: number | string, form: RoleForm) : Promise<ModificationResult<number>> {
    const response = await secureRequest(`${ENDPOINT}/${id}`, {
        ...PUT_INIT,
        body: JSON.stringify(form)
    })

    return await response.json()
}
