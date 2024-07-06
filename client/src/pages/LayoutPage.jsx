import React, { useState } from 'react'
import Header from '../components/Header'
import Login from './LoginPage'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
    const [showAuth, setShowAuth] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {showAuth && <Login setShowAuth={setShowAuth} />}
      <Header setShowAuth={setShowAuth} />
      <main className="mx-4 sm:mx-6 md:mx-8 grow">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  )
}

export default Layout
