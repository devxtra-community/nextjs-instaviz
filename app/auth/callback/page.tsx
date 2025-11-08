"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react'

export default function GoogleCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {

        const token = searchParams.get("token");

        if (token) {
            localStorage.setItem("token", token)
            router.push('/home')
        }
        else {
            router.push('/signup')
        }

    }, [router, searchParams])

    return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-gray-500 text-lg">Signing you in with Google...</p>
        </div>
    )
}


