import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Router } from './Router';

const App = () => {
  const router = createBrowserRouter(Router())

  return (
    <RouterProvider router={router} />
  )
}

export default App