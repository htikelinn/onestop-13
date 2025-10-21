import "server-only"

import { getAccessToken, getRefreshToken, setAuthResult } from "./login-infos"
import { redirect } from "next/navigation"
import { POST_INIT, RestClientError } from "./utils"
import { AuthResponse } from "./model/auth.model"

export async function publicRequest(path: string, options : RequestInit = {}) {
    const response = await fetch(`${process.env.APIURL}/${path}`, options)

    if(response.status === 400) {
        throw new RestClientError('Business', await response.json() as string[])
    }

    if(response.status === 500) {
        throw new RestClientError('Server', await response.json() as string[])
    }

    return response
}

export async function secureRequest(path: string, options : RequestInit = {}) {
    
    let response: Response | undefined 

    async function fetchWithToken(token: string) {
        return await fetch(`${process.env.APIURL}/${path}`, {
            ...options,
            headers: {
                ...options.headers,
                ...(token && {"Authorization" : token})
            }
        })
    }

    const accessToken = await getAccessToken()

    if(!accessToken) {
        redirect("/signin")
    }
    
    response = await fetchWithToken(accessToken)

    if(response?.status === 410) {

        const refreshToken = await getRefreshToken()

        const refreshResponse = await fetch(`${process.env.APIURL}/auth/refresh`, {
            ...POST_INIT,
            body: JSON.stringify({
                token: refreshToken
            })
        })

        if(refreshResponse.ok) {
            const refreshResult = await refreshResponse.json() as AuthResponse  
            response = await fetchWithToken(refreshResult.accessToken)
        } else {
            redirect("/signin")
        }
    }

    if(!response || response.status === 401) {
        redirect("/signin")
    }

    if(response?.status === 400) {
        throw new RestClientError('Business', await response.json() as string[])
    }

    if(response?.status === 500) {
        throw new RestClientError('Server', await response.json() as string[])
    }

    return response
}

