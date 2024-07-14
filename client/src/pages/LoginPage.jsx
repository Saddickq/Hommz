import { Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import { userContext } from "../../context"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import GoogleAuth from "../components/GoogleAuth";
import FormInputs from "../components/FormInputs";


const Login = ({ setShowAuth }) => {
    const {setUser} = useContext(userContext)

    const [authType, setAuthType] = useState("Login")

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const [redirect, setRedirect] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        if (formData.confirm_password !== formData.password) {
            toast.error("Passwords dont Match")
            return
        }
        try{
            await axios.post('/auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
            toast.success("user was registered successfully")
            setAuthType("Login")
        } catch (error) {
            toast.error("User Registration failed")
        }
    }
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const { data } = await axios.post('/auth/login', {
                email: formData.email,
                password: formData.password
            },)

            toast.success("Login was successful")
            setUser(data)
            setRedirect('/')
            setShowAuth(false)
        } catch (error) {
            toast.error("Login was Unsuccesful")
        }
    }
    

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="z-1 fixed h-full w-full grid bg-faded animate-fade-in">
            <div className="flex flex-col shadow-md rounded-2xl place-self-center p-8 bg-white w-full max-w-md animate-fadeIn">
                <form onSubmit={authType==="Login" ? handleLogin : handleRegister}>
                    <FormInputs formData={formData} handleChange={handleChange} authType={authType} setShowAuth={setShowAuth} />
                    <button className="bg-primary text-white rounded-lg w-full py-2 font-bold my-4 outline outline-1 focus:outline-offset-2 outline-primary hover:opacity-80">{authType}</button>
                </form>
                {/* <GoogleAuth /> */}
                {authType==="Login"
                    ?<p className="text-gray-500 text-sm my-4">
                        Do you need an Account?  <span className="text-primary cursor-pointer font-bold" onClick={() => setAuthType("Register")}>Register here</span></p>
                    :<p className="text-gray-500 text-sm my-4">
                        Already have an Account?  <span className="text-primary cursor-pointer font-bold" onClick={() => setAuthType("Login")}>Sign in here</span></p>
                }
            </div>
        </div>
    );
}

export default Login
