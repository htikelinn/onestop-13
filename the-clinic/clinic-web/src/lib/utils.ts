import { clsx, type ClassValue } from "clsx"
import { format, parse } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDate(dateStr?: string):Date | undefined {
    if(dateStr) {
        return parse(dateStr, "yyyy-MM-dd", new Date)
    }
}

export function formatDate(date?: Date): string | undefined {
    if(date) {
        return format(date, "yyyy-MM-dd")
    }
}

export function queryString(form: {[key: string] : string | string[] | undefined}) {
    const params = new URLSearchParams

    Object.keys(form).forEach(key => {
        const value = form[key]

        if(value) {
            if(Array.isArray(value)) {
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