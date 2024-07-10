import { useContext } from "react"
import { Link } from "react-router-dom"
import { userContext } from "../../context"
import { FaCircleUser } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ setShowAuth }) => {
    const {user} = useContext(userContext)
    return (
        <header className="py-2 border-b border-gray-300 px-1 md:px-8 md:py-3">
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                <div className="flex justify-between w-full sm:w-auto">
                    <Link to='/' className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 md:h-10 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                        </svg>
                        <span className="text-xl md:text-2xl text-primary font-bold"><span className="text-2xl md:text-3xl">H</span>omm<span className="text-2xl md:text-3xl">z</span></span>
                    </Link>
                    <div className="flex sm:hidden gap-4 items-center ">
                        {!!user
                            ? 
                            <Link to="/account" className="flex items-center gap-1 border border-gray-300 rounded-full py-1 px-2 hover:shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <FaCircleUser className="size-6 text-slate-600" />
                                <div className="text-sm md:text-base">{user.username.split(' ')?.[0]}</div>
                            </Link>
                            :
                            <button onClick={()=>setShowAuth(true)} className="rounded-full shadow bg-primary hover:opacity-80 text-white text-sm md:text-base py-2 px-4">Sign In</button>
                        }
                    </div>
                </div>
                <div className="flex items-center gap-4 border shadow rounded-full p-1 cursor-pointer hover:shadow-md mt-2 md:mt-0 w-70">
                    <input placeholder="Search " className="outline-none px-4 w-full" />
                    <button className="bg-primary rounded-full p-2 m-1 md:m-0 text-white">
                        <IoSearchSharp className="size-4 md:size-5" /> 
                    </button>
                </div>
                <div className="hidden sm:flex gap-4 md:gap-8 items-center">
                    {!!user
                        ? 
                        <Link to="/account" className="flex items-center gap-1 bg-primary text-white rounded-full py-1 px-2 hover:shadow-md">
                            <RxHamburgerMenu className="size-4 md:size-6" />
                            <FaCircleUser className="size-7" />
                            <div className="text-sm md:text-base">{user.username.split(' ')?.[0]}</div>
                        </Link>
                        :
                        <button onClick={()=>setShowAuth(true)} className="bg-primary shadow hover:opacity-80 text-white rounded-full text-sm md:text-base font-semibold py-2 px-4">Sign In</button>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header
