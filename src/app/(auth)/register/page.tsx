import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormMessage, Message } from "@/components/forms/formMessage";
import SubmitButton from "@/components/forms/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils";
import { ArrowRight, UserCircle2, Lock, UserCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";


const RegisterPage = ({ searchParams }: { searchParams: Message }) => {
	const signIn = async (formData: FormData) => {
		"use server";

		console.log("Signing in user");

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const phoneNumber = formData.get("phoneNumber") as string;
		const name = formData.get("name") as string;
		const confirmPassword = formData.get("confirmPassword") as string;

		if (password !== confirmPassword) {
			return encodedRedirect("error", "/register", "Passwords do not match");
		}

		const supabase = createClient();

		const { error } = await supabase.auth.signUp({
			email,
			password,
			phone: phoneNumber,
			options: {
				data: {
					full_name: name,
					phone: phoneNumber,
				},
			},
		});

		if (error) {
			console.log(error.message);
			return encodedRedirect("error", "/register", error.message);
		}
		console.log("User created");

		return redirect("/dashboard");
	};
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Hola! Crea tu cuenta en Unlock
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6">
                        <div>
                            <Label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nombre
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCircle
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="pl-10"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
						                        <div>
                            <Label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Correo Electrónico
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="pl-10"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <Label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Número de teléfono
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    autoComplete="phoneNumber"
                                    required
                                    className="pl-10"
                                    placeholder="3001234567"
                                />
                            </div>
                        </div>
                        <div>
                            <Label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Contraseña
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="pl-10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
						<div>
                            <Label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirma tu contraseña 
                            </Label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="confirm-password"
                                    required
                                    className="pl-10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <SubmitButton
								formAction={signIn}
							>
                                Sign in
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </SubmitButton>
							<FormMessage message={searchParams} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
