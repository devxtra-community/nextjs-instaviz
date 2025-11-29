import { useSearchParams } from "next/navigation";

export default function GoogleButton() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const handleGoogleLogin = () => {
    const base = process.env.NEXT_PUBLIC_API;
    const url = redirect
      ? `${base}/auth/google?redirect=${redirect}`
      : `${base}/auth/google`;
    window.location.href = url;
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2 rounded-md border py-2.5 text-sm cursor-pointer font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-5 w-5"
        />
        Sign in with Google
      </button>
    </div>
  );
}