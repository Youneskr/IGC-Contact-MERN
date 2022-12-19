import { createContext, useEffect, useReducer } from "react"

// 1st Step: create context
export const AuthContext = createContext()

// 3rd Step: create the reducer to interact with actions type with dispatch fct
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload))
            return {
                user: action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('user')
            return {
                user: null
            }
        default:
            return state
    }
}

// 2nd Step: create context 'provider' to provide all children with state and dispatch fct
export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    })



    useEffect(() => {

        const verify = async token => {
            const options = {
                method: 'POST',
                body: JSON.stringify({token}),
                headers: {'Content-Type': 'application/json'},
            }
    
            const response = await fetch('/api/user/islogin', options)
            if (!response.ok) {
                localStorage.removeItem('user')
            }
        }

        try {
            const token = JSON.parse(localStorage.getItem('user')).token
            if (token) verify(token)
        }
        catch (err) {
            
        }
        
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}