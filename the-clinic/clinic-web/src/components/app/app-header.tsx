'use client'

import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import React from "react";

type AppHeaderProps = {
    baseUrl : string, 
    routeNames : Map<string, string>
}

type BreadcrumbData = {
    name: string
    link? : string
}

export default function AppHeader({baseUrl, routeNames} : AppHeaderProps) {

    const currentPath = usePathname()
    const paths = currentPath.split("/").filter(a => a !== '');
    const links:BreadcrumbData[] = paths.reduce((acc, current, index) => {
            if(index > 0) {
                acc.push({
                    name : routeNames.get(current) || "Details",
                    link: `/${paths.slice(0, index + 1).join("/")}`
                })
            }
            return acc
        }, [] as BreadcrumbData[])

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-3">
                <SidebarTrigger />

                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4" />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={baseUrl}>The Clinic</BreadcrumbLink>
                        </BreadcrumbItem>

                        {links.map((item, index) => 
                            <React.Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {index < links.length - 1 ? 
                                        <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink> :
                                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                                    }
                                </BreadcrumbItem>
                            </React.Fragment>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}