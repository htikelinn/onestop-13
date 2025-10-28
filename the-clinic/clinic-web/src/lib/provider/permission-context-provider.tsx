'use client'

import React, { useState } from "react";
import { type PermissionType } from "./permission-context";
import { PermissionContext } from './permission-context'

export default function PermissionContextProvider({children} : {children : React.ReactNode}) {
    const [permission, setPermission] = useState<PermissionType>('Read')

    return (
        <PermissionContext.Provider value={{permission: permission, setPermission : setPermission}}>
            {children}
        </PermissionContext.Provider>
    )
}