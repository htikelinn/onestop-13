import { Metadata } from "next";
import ClientSignIn from "./_commons/client-signin";
import AuthHeader from "@/components/app/auth-header";

export const metadata: Metadata = {
  title: "The Clinic | Sign In",
  description: "Clinic Management System Sign In Page",
};


export default function SignInPage() {
    return (
        <div>
            <AuthHeader title="Sign In" 
                message="Please sign in below to confirm your arrival. We look forward to seeing you shortly." />
            
            <div className="mt-4">
                <ClientSignIn />
            </div>
        </div>
    )
}