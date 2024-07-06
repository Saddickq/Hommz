import React from 'react'

const FormInputs = ({ formData, handleChange, authType, setShowAuth }) => {
  return (
    <div>
        <div className="flex justify-between items-center">
            <h2 className="text-start text-3xl mb-2 font-bold text-primary">{authType}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => setShowAuth(false)} className="size-5 cursor-pointer ml-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
      {authType==="Register" && (
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
            />
        )}
        <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            name="email"
            onChange={handleChange}
        />
        <input
            type="password"
            placeholder="Your password"
            value={formData.password}
            name="password"
            onChange={handleChange}
        />
        {authType==="Register" && (
            <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm password"
            />
        )}
    </div>
  )
}

export default FormInputs
