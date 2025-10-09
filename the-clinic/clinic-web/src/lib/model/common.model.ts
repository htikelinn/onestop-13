
export type PagerInfo = {
    page: number
    size: number
    totalCount: number
    totalPage: number
    links: number[]
}

export type PageResult<T> = {
    list : T [],
    pageInfo : PagerInfo
}

export type ModificationResult = {
    success: boolean
    message: string
}

export const DUMMY_PAGE:PagerInfo = {
    page: 5,
    size: 10,
    totalCount: 35,
    totalPage: 10,
    links: [2, 3, 4, 5, 6]
}