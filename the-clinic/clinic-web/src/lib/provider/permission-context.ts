import React, { createContext, useContext, useState } from "react"

export type PermissionType = 'Read' | 'Write' | 'Modify' | 'Delete'

type PermissionContextType = {
    permission: PermissionType
    setPermission: (permission: PermissionType) => void
}

export const PermissionContext = createContext<PermissionContextType | undefined>(undefined)

export function usePermissionContext() {
    const context = useContext(PermissionContext)

    if(!context) {
        throw new Error("Invalid usage of Permission Context")
    }

    return context
}
