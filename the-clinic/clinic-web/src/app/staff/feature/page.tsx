'use client'

import { AppFeature, FeatureSearch } from "@/lib/model/feature.model"
import { useEffect, useState } from "react"

import * as featureClient from "@/lib/model/feature.service"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import FormsSelect from "@/components/forms/forms-select"
import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import IconComponent from "@/components/app/icon-component"

export default function FeatureList() {

    const [list, setList] = useState<AppFeature[]>([])
    const [groupList, setGroupList] = useState<string[]>([])

    async function search(form:FeatureSearch) {

        if(form.group === "-1") {
            delete form.group
        }

        const result = await featureClient.search(form)
        setList(result)
    }

    useEffect(() => {
        async function load() {
            const groups = await featureClient.getGroupOptions()
            setGroupList(groups)

            await search({})
        }

        load()
    }, [setList, setGroupList])

    return (
        <div className="space-y-4">
            <SearchForm groups={groupList} onSearch={search} />
            <ResultTable list={list} />
        </div>
    )
}

function ResultTable({list} : {list: AppFeature[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Ptah</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {list.map((item, index) => 
                <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                        <IconComponent name={item.icon} className="size-4" />
                    </TableCell>
                    <TableCell>{item.group}</TableCell>
                    <TableCell>{item.path}</TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
    )
}

function SearchForm({groups, onSearch} : {groups : string[], onSearch: (form: FeatureSearch) => void}) {

    const form = useForm<FeatureSearch>({
        defaultValues: {
            group: "",
            name: ""
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSearch)} className="flex gap-4 items-end">
                <FormsSelect control={form.control} path="group" label="Group" options={[
                    {key: "-1", value: "All Group"},
                    ...(groups.map(a => ({key : a, value: a})))
                ]} />

                <FormsInput control={form.control} path="name" label="Feature Name" placeholder="Search Name" />

                <Button type="submit">
                    <Search /> Search
                </Button>
            </form>
        </Form>
    )

}