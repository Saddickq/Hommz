import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
    const googleHandler = () => {
        window.location.href = "http://localhost:8000/auth/google"
    }
    return (
        <button onClick={googleHandler} className="flex items-center gap-2 mt-4 justify-center bg-white border border-gray-300 rounded-xl shadow-md px-6 py-2 text-sm font-medium dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <FcGoogle className="size-7" />
            <span className="text-gray-500">Continue with Google</span>
        </button>
    )
}

export default GoogleAuth
