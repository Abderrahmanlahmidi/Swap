"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, Phone, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import FormInput from '../components/ui/FormInput';


const registerSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function RegisterPage() { 
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="w-full lg:w-1/2 flex flex-col p-8 bg-white dark:bg-neutral-950">
                <div className="mb-8 lg:mb-12">
                    <Link href="/" className="flex items-center gap-2 w-fit">
                        <div className="bg-neutral-900 text-white p-1.5 rounded-sm">
                            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <span className="text-2xl font-semibold tracking-tighter text-neutral-900 dark:text-white">
                            SWAP.
                        </span>
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto space-y-8 flex-1 flex flex-col justify-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            Create Account
                        </h1>
                        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                            Join us to simplify your shopping experience.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                label="First Name"
                                placeholder="John"
                                icon={User}
                                error={errors.firstName}
                                {...register("firstName")}
                            />
                            <FormInput
                                label="Last Name"
                                placeholder="Doe"
                                icon={User}
                                error={errors.lastName}
                                {...register("lastName")}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormInput
                                label="Phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                icon={Phone}
                                error={errors.phone}
                                {...register("phone")}
                            />

                            <FormInput
                                label="Email"
                                type="email"
                                placeholder="name@example.com"
                                icon={Mail}
                                error={errors.email}
                                {...register("email")}
                            />

                            <div className="space-y-1">
                                <FormInput
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    icon={Lock}
                                    error={errors.password}
                                    {...register("password")}
                                />
                                {!errors.password && <p className="text-xs text-neutral-500 pl-1">Must be at least 6 characters</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input required type="checkbox" className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900" />
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                I agree to the <a href="#" className="underline hover:text-neutral-900 dark:hover:text-white">Terms of Service</a> and <a href="#" className="underline hover:text-neutral-900 dark:hover:text-white">Privacy Policy</a>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center space-x-2 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-neutral-900 dark:text-white hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-neutral-900">
                <div className="absolute inset-0 bg-[url('/images/hero-man.png')] bg-cover bg-center" style={{ opacity: 1 }}></div>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-12 text-white">
                    <div className="mb-6 space-y-2">
                        <p className="text-sm font-bold tracking-widest uppercase text-neutral-300">Join the movement</p>
                        <h2 className="text-5xl font-bold">Experience the<br />Difference.</h2>
                    </div>
                    <p className="text-xl text-neutral-200 max-w-lg">
                        Unlock exclusive access to new arrivals, special offers, and a personalized shopping experience.
                    </p>
                </div>
            </div>
        </div>
    );
}
