import { Suspense } from "react";
import SignUpPageContent from "./signUp";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPage/>
    </Suspense>
  );
}
//comment