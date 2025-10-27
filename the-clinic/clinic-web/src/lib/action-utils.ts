import { toast } from "sonner"

export async function safeCall(action : () => Promise<void>) {
    try {
        await action()
    } catch (e:any) {
        
        let errorObject : {
            type: string
            message: string[]
        } = {
            type: "Unknown Error",
            message: [
                e
            ]
        }

        if(e.message) {
            errorObject = JSON.parse(e.message)
        }

        toast(errorObject.type, {
            description: errorObject.message
        })
    }
}