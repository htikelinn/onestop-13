import { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { HTMLInputTypeAttribute } from "react"

type FormsInputProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label: string
    type?: HTMLInputTypeAttribute
    className?: string
}

export default function FormsInput<T extends FieldValues>({
    control,
    path,
    label,
    type,
    className
} : FormsInputProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input type={type || 'text'} {...field} placeholder={`Enter ${label}`} />
                </FormControl>
                <FormMessage />
            </FormItem>
        } />
    )
}