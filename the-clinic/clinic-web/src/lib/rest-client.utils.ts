import { cookies } from "next/headers"
import "server-only"
import { AuthResponse } from "./model/auth.model"
import { redirect } from "next/navigation"

export function withAuth<T extends (...args : any[]) => Promise<Response>>(fun : T) {
    return async (...args: Parameters<T>):Promise<ReturnType<T>> => {
        const cookieStore = await cookies()
        const token = cookieStore.get('accessToken')?.value

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
            const refreshToken = cookieStore.get('refreshToken')?.value
            const refreshUrl = `${process.env.BASEURL}/auth/refresh`
            const refreshResp = await fetch(refreshUrl, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    token: refreshToken
                })
            })

            if(!refreshResp.ok) {
                redirect("/signin")
            } else {
                const refreshResult = await refreshResp.json() as AuthResponse
                await setAuthResult(refreshResult)
                response = await makeRequest(refreshResult.accessToken)
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

export async function setAuthResult(response : AuthResponse) {

    const {accessToken, refreshToken, ...accountInfo} = response
        
    const secure = process.env.NODE_ENV === "production"

    const cookieStore = await cookies()
    
    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    })

    cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    })

    cookieStore.set('accountInfo', JSON.stringify(accountInfo), {
        httpOnly: true,
        secure: secure,
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60
    })
}

export function queryString(form: {[key: string] : string | string[] | undefined}) {
    const params = new URLSearchParams

    Object.keys(form).forEach(key => {
        const value = form[key]

        if(value) {
            if(value.length) {
                Array.from(value).forEach(item => {
                    params.append(key, item)
                })
            } else {
                params.append(key, value as string)
            }
        }
    })

    return params.toString()
} 