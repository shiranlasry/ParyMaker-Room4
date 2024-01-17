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


function App() {

 
  const router= createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <LogIn />},
    { path: "/register", element: <Register />},
    { path: "/addNewParty", element: <AddNewParty />},
    { path: "/userPage", element: <UserPage />},
    { path: "*", element: <Page404 /> },
    { path: "/partyPage/:party_id", element: <PartyPage />},
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App


