//App.tsx is the root component of the app.
import './App.scss'
import Home from './pages/home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page404 from './pages/page404/Page404'

function App() {
  const router= createBrowserRouter([
    { path: "/", element: <Home /> },
   
    { path: "*", element: <Page404 /> },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
