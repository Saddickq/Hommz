import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/LayoutPage"
import axios from "axios"
import { UserContextProvider } from "../context"
import ProfilesPage from "./pages/ProfilesPage"
import PlacesPage from "./pages/PlacesPage"
import PlacesFormPage from "./pages/PlacesFormPage"
import BookingsPage from "./pages/BookingsPage"
import BookingPage from "./pages/BookingPage"
import HomePage from "./pages/HomePage"
import RoomPage from "./pages/RoomPage"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/account',
                element: <ProfilesPage />
            },
            {
                path: '/account/places',
                element: <PlacesPage />
            },
            {
                path: '/account/bookings',
                element: <BookingsPage />
            },
            {
                path: '/account/bookings/:id',
                element: <BookingPage />
            },
            {
                path: '/account/places/new',
                element: <PlacesFormPage />
            },
            {
                path: '/account/places/:id',
                element: <PlacesFormPage />
            },
            {
                path: '/place/:id',
                element: <RoomPage />
            },
            
        ]
    }
])

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const App = () => {
  return (
      <div>
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
      </div>
  )
}

export default App
