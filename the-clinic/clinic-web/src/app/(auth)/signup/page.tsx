import AuthHeader from "@/components/app/auth-header";
import { Metadata } from "next";
import ClientSignUp from "./_commons/client-signup";

export const metadata: Metadata = {
  title: "The Clinic | Sign Up",
  description: "Clinic Management System Sign Up Page",
};

export default function SignUpPage() {
    return (
        <div>
            <AuthHeader title="Sign Up" message="We're excited to have you join us. Sign up below to get started." />

            <div className="mt-4">
                <ClientSignUp />
            </div>
        </div>
    )
}