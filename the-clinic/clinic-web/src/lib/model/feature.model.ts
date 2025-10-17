import { LucideIconType } from "./auth.model"

export type AppFeature = {
    path: string
    name: string
    icon: LucideIconType
    group: string
}

export type FeatureSearch = {
    group?: string
    name?: string
}