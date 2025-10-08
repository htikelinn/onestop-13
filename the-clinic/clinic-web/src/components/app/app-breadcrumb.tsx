'use client'

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";

export type BreadcrumbProps = {
    baseUrl : string, 
    routeNames : Map<string, string>
}

export default function AppBreadcrumbs({baseUrl, routeNames} : BreadcrumbProps) {

    const pathName = usePathname()
    const list = getBreadCrumbs(pathName, routeNames)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href={baseUrl}>The Clinic</BreadcrumbLink>
                </BreadcrumbItem>
                
                {list.map((item, index) => 
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            {item.link ? 
                                <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink> :
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            }
                        </BreadcrumbItem>
                    </React.Fragment>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

type BreadcrumbData = {
    name: string
    link? : string
}

function getBreadCrumbs(pathName:string, routeNames: Map<string, string>):BreadcrumbData[] {

    const paths = pathName.split("/").filter(a => a !== '')

    if(paths.length == 1) {
        return [{name : "Dashboard"}]
    }

    const result:BreadcrumbData[] = []

    for(let i = 1; i < paths.length; i ++) {
        let url;

        if(i < paths.length - 1) {
            url = `/${paths.slice(0, i + 1).join("/")}`
        }

        result.push({name: routeNames.get(paths[i]) || '', link: url})
    }

    return result
}
