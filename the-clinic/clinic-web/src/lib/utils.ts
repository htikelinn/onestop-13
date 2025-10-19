import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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