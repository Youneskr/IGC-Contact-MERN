import { useState } from 'react'
import { useAuthContext } from './useAuthContext'


export const UseLogin = () => {
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)

    const login = async (pseudo, password) => {
        setIsPending(true)
        setError(false)

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({pseudo, password})
        }

        const response = await fetch('/api/user/login', options)
        const data = await response.json()

        if (!response.ok) {
            setIsPending(false)
            setError(data.error)    
        }
        else {
            setIsPending(false)
            setError(null)
            dispatch({type: 'LOGIN', payload: data})
        }
    }

    return { login, isPending, error }

}