import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type FormsSelectProps<T extends FieldValues> = {
    control: Control<T>
    path: Path<T>
    label: string
    className?: string
    options: {key: string, value: string}[]
}

export default function FormsSelect<T extends FieldValues>({control, path, label, className, options} : FormsSelectProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${label}`} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {options.map((item, index) => 
                            <SelectItem value={item.key} key={index}>{item.value}</SelectItem>
                        )}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        } />
    )
}