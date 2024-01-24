//App.tsx is the root component of the app.
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.scss'
import AdminParties from './components/admin-paries/AdminParties'
import AdminUsers from './components/admin-users/AdminUsers'
import About from './pages/about/About'
import AddNewParty from './pages/addNewParty/AddNewParty'
import AdminMain from './pages/admin-main/AdminMain'
import AllParties from './pages/all-parties/AllParties'
import Contact from './pages/contact/Contact'
import Home from './pages/home/Home'
import LogIn from './pages/logIn/LogIn'
import Page404 from './pages/page404/Page404'
import PartyPage from './pages/partyPage/PartyPage'
import Register from './pages/register/Register'
import UserPage from './pages/userPage/UserPage'


function App() {

 
  const router= createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LogIn />},
    { path: "/register", element: <Register />},
    { path: "/addNewParty", element: <AddNewParty />},
    { path: "/userPage", element: <UserPage />},
    { path: "*", element: <Page404 /> },
    { path: "/partyPage/:party_id", element: <PartyPage />},
    { path: "/admin/:user_id", element: <AdminMain />},
    { path: "/admin/parties", element: <AdminParties />},
    { path: "/admin/users", element: <AdminUsers />},
    { path: "/about", element: <About />},
    { path: "/contact", element: <Contact />},
    { path: "/allParties", element: <AllParties />},
    
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App


