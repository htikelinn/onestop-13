import { Check, X } from "lucide-react";

export default function ActiveStatus({deleted, className} : {deleted : boolean, className?: string}) {
    
    const styleClass = className || 'size-4'
    
    return deleted ? <X className={styleClass} /> : <Check className={styleClass} />
}