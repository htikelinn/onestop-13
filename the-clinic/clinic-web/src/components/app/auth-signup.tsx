'use client'

import FormsInput from "@/components/forms/forms-input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SignUpForm, SignUpSchema } from "@/lib/model/auth.model"
import { signUpAction } from "@/lib/model/auth.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { Unlock, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ClientSignUp() {

    const router = useRouter()

    const form = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    async function onSignUp(form:SignUpForm) {
        const result = await signUpAction(form)

        if(result.success) {
            router.push(`/${result.message.toLowerCase()}`)
        } else {
            toast("Sign Up Error", {
                description: result.message
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignUp)}>

                <FormsInput label="Name" control={form.control}
                    path="name" className="mb-3" />

                <FormsInput label="Email" control={form.control}
                    path="email" type="email" className="mb-3" />

                <FormsInput label="Password" control={form.control}
                    path="password" type="password" className="mb-3" />

                <div>
                    <Button type="submit" className="me-2">
                        <UserPlus /> Sign Up
                    </Button>

                    <Button asChild variant={'outline'}>
                        <Link href="/signin">
                            <Unlock /> Sign In
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}