export default function GoogleButton() {
    return (
        <div>
            <button
                type="button"
                onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API}/auth/google`}
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
    )
}
