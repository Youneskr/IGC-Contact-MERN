import Index from './routes/index'
import Root, { loader as rootLoader, action as rootAction }  from './routes/root'
import Error from './components/Error'

import Contact from './components/Contact'
import { loader as contactLoader } from './routes/contact'
import Edit, { action as editAction } from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import Login from './routes/login'

import { useAuthContext } from './hooks/authHooks/useAuthContext'
import { Navigate } from 'react-router-dom'


export const Router = () => {

    const {user} = useAuthContext()


    return [
        {
            path: 'login',
    
            element: !user ? <Login /> : <Navigate to={'/'} />,
    
        },
        {
            path: '',
    
            element: !user ? <Navigate to={'/login'} /> : <Root />,
    
            errorElement: <Error />,
    
            loader: rootLoader,
    
            action: rootAction,
    
            children: [ 
                {
                    errorElement: <Error />,
                    children: [
                        {
                            index: true,
                            element: <Index />
                        },
                        {
                            path: '/contacts/:slug',
                            element: <Contact />,
                            loader: contactLoader
                        },
                        {
                            path: '/contacts/:slug/edit',
                            element: <Edit />,
                            loader: contactLoader,
                            action: editAction
                        },
                        {
                            path: '/contacts/:slug/destroy',
                            action: destroyAction
                        }
                    ]
                }
            ]
        }
    ]
}

