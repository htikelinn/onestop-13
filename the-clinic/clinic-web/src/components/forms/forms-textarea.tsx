import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

type FormsTextareaProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label: string
    className?: string
    placeholder?: string
}

export default function FormsTextarea<T extends FieldValues>({control, path, label, className, placeholder} : FormsTextareaProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder={placeholder || `Enter ${label}`} />
                </FormControl>
                <FormMessage />
            </FormItem>
        } />
    )
}