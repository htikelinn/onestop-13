import "server-only"

import { AuthResponse } from "./model/auth.model"
import { getAccessToken } from "./login-info.utils"
import { redirect } from "next/navigation"
import { refreshToken } from "./model/auth.service"

export function withAuth<T extends (...args : any[]) => Promise<Response>>(fun : T) {
    return async (...args: Parameters<T>):Promise<ReturnType<T>> => {
        const token = await getAccessToken()

        const [url, options = {}] = args
        const requestOptions = options as RequestInit

        async function makeRequest(token?: string) {
            const requestInit:RequestInit = {
                ...requestOptions,
                headers: {
                    ...requestOptions.headers,
                    ...(token && { Authorization : token})
                },
            }

            return await fun(url, requestInit) as ReturnType<T>
        }

        let response = await makeRequest(token)

        if(response.status === 410) {
            const newToken = await refreshToken()
            if(newToken) {
                response = await makeRequest(newToken)
            }
       }

        if(response.status === 401) {
            redirect("/signin")
        }

        return response
    }
}

export async function fetchApi(path:string, options?: RequestInit) {
    const url = `${process.env.BASEURL}/${path}`
    const response =  await fetch(url, options)

    if(response.status === 400 || response.status === 500) {
        const messages = await response.json() as string []
        throw {
            status : response.status,
            messages : messages
        }
    }

    return response
}

export const fetchWithAuth = withAuth(fetchApi)