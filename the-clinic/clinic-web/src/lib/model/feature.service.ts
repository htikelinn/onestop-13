'use server'

import { AppFeature, FeatureSearch } from "./feature.model";
import { fetchWithAuth, queryString } from "../rest-client.utils";

export async function search(form: FeatureSearch):Promise<AppFeature[]> {
    const response =  await fetchWithAuth(`staff/feature?${queryString(form)}`)
    return await response.json()
}

export async function getGroupOptions():Promise<string[]> {
    const response = await fetchWithAuth("staff/feature/group")
    return await response.json()
}