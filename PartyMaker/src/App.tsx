//App.tsx is the root component of the app.
import './App.scss'
import Home from './pages/home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page404 from './pages/page404/Page404'
import LogIn from './pages/logIn/LogIn'
import Register from './pages/register/Register'
import AddNewParty from './pages/addNewParty/AddNewParty'
import UserPage from './pages/userPage/UserPage'
import PartyPage from './pages/partyPage/PartyPage' 
import AdminMain from './pages/admin-main/AdminMain'
import AdminParties from './components/admin-paries/AdminParties'
import AdminUsers from './components/admin-users/AdminUsers'  
import About from './pages/about/About';
import Contact from './pages/contact/Contact';


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
    
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App


