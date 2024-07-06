import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import { userContext } from "../../context"
import axios from "axios"
import AccountNav from "../components/AccountNav"
import PlacesPage from "./PlacesPage"

const AccountsPage = () => {

    const {user, setUser} = useContext(userContext)
    const [toHome, setToHome] = useState(false)

    const logout = async () => {
        await axios.get("/auth/logout")
        setToHome(true)
        setUser(null)
    }

    if (!user || toHome) {
        return <Navigate to={'/'} />
    }
  return (
    <div>
        <AccountNav />
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-3 font-bold text-2xl">Your Account Info</h2>
            <div className="text-xl mb-3">User name: <span className="text-gray-500">{user?.username}</span></div>
            <div className="text-xl">User Email: <span className="text-gray-500">{user?.email}</span></div>
            <button onClick={logout} className="bg-primary w-full rounded-full py-2 mt-4 text-white">Logout</button>
        </div>

    </div>
  )
}

export default AccountsPage
