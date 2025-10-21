import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { success } from "zod"
import { ModificationResult } from "."
import { secureRequest } from "./rest-clients"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export class RestClientError {
    constructor(
        readonly type:'Business' | 'Server',
        readonly messages:string[]
    ) {}
}

export const POST_INIT:RequestInit = {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
}

export const PUT_INIT:RequestInit = {
    method: "PUT",
    headers: {
        "Content-Type" : "application/json"
    },
}

export async function safeCreate(path:string, json: string) : Promise<ModificationResult> {
    try {
        const response = await secureRequest(path, {
            ...POST_INIT,
            body: json
        })

        const { id } = await response.json()

        return {
            success: true,
            message: id
        }
    } catch (e) {
        if(e instanceof RestClientError) {
            return {
                success: false,
                message: e.messages
            }
        }
        throw e
    }
}

export async function safeUpdate(path:string, json: string) : Promise<ModificationResult> {
    try {
        const response = await secureRequest(path, {
            ...PUT_INIT,
            body: json
        })

        const { id } = await response.json()

        return {
            success: true,
            message: id
        }
    } catch (e) {
        if(e instanceof RestClientError) {
            return {
                success: false,
                message: e.messages
            }
        }
        throw e
    }
}