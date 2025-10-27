'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import FormsInput from "@/components/forms/forms-input"
import { Unlock, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signInAction } from "@/lib/model/auth.service"
import { useRouter } from "next/navigation"
import { SignInForm, SignInSchema } from "@/lib/model/auth.model"
import { safeCall } from "@/lib/action-utils"

export default function ClientSignIn() {

    const router = useRouter()

    const form = useForm<SignInForm>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSignIn(form:SignInForm) {
        safeCall(async () => {
            const result = await signInAction(form)
            router.replace(result.message as string)
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignIn)}>
                <FormsInput control={form.control} path="email" 
                    label="Login Id" type="email" className="mb-3" />

                <FormsInput control={form.control} path="password"
                    label="Password" type="password" className="mb-3" />

                <div>
                    <Button type="submit" className="me-2">
                        <Unlock /> Sign In
                    </Button>

                    <Button asChild variant={'outline'}>
                        <Link href={"/signup"}>
                            <UserPlus /> Sign Up
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    )
}