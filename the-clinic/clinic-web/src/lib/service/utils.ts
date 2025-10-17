import { cookies } from "next/headers"
import "server-only"

export function withAuth<T extends (...args : any[]) => Promise<Response>>(fun : T) {
    return async (...args: Parameters<T>):Promise<ReturnType<T>> => {
        const cookieStore = await cookies()
        const token = cookieStore.get('accessToken')?.value

        const [url, options = {}] = args
        const requestOptions = options as RequestInit

        const requestInit:RequestInit = {
            ...requestOptions,
            headers: {
                ...requestOptions.headers,
                ...(token && { Authorization : token})
            },
        }

        return fun(url, requestInit) as ReturnType<T>
    }
}

export async function fetchApi(path:string, options: RequestInit) {
    const url = `${process.env.BASEURL}/${path}`
    const response =  await fetch(url, options)

    if(!response.ok) {
        const messages = await response.json() as string []
        throw {
            status : response.status,
            messages : messages
        }
    }

    return response
}

export const fetchWithAuth = withAuth(fetchApi)