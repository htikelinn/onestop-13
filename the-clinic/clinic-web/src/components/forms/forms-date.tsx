import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format, formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

type FormsDateProps<T extends FieldValues> = {
    control : Control<T>
    path: Path<T>
    label: string
    className? : string
    start?: Date
    end?: Date
    availableDates?: Date[]
}

export default function FormsDate<T extends FieldValues>({control, path, label, className, start, end, availableDates} : FormsDateProps<T>) {
    
    function isDisabled(date:Date) {
        if((start && start > date) 
            || (end && end < date)) {
            return true
        }

        if(availableDates && !availableDates
                .map(a => formatDate(a, "yyyyMMdd"))
                .includes(formatDate(date, "yyyyMMdd"))) {
            return true
        }
        
        return false
    }
    
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>

                <Popover>
                    <PopoverTrigger>
                        <FormControl>
                            <Button variant={'outline'} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? 
                                    format(new Date(field.value), "PPP") : 
                                    <span>Pick a date</span>
                                }
                                <CalendarIcon className="ml-auto opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} disabled={isDisabled}
                            onSelect={field.onChange} captionLayout="dropdown" />
                    </PopoverContent>
                </Popover>

                <FormMessage />
            </FormItem>
        } />
    )
}