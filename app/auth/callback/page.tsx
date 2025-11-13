// app/auth/callback/page.js
"use client"
import { Suspense } from "react"
import GoogleCallbackPage from "./GoogleCallbackPage"

export default function CallbackPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GoogleCallbackPage />
    </Suspense>
  )
}
