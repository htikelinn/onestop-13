'use server'

import { AppFeature, FeatureSearch } from "./feature.model";
import { queryString } from "../utils";
import { secureRequest } from "../rest-clients";

export async function search(form: FeatureSearch):Promise<AppFeature[]> {
    const response =  await secureRequest(`staff/feature?${queryString(form)}`)
    return await response.json()
}

export async function getGroupOptions():Promise<string[]> {
    const response = await secureRequest("staff/feature/group")
    return await response.json()
}