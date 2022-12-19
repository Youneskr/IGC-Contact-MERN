import { redirect } from "react-router-dom"
import { UseAuthContext } from "../authHooks/useAuthContext"


export const UseCreateContacts = async (create) => {
    const { user } = UseAuthContext()

    const options = {
        method: 'POST',
        body: JSON.stringify(create),
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'application/json'
        }   
    }

    const response = await fetch('/api/contacts', options)

    const contact = await response.json()

    if (response.ok) return redirect(`/contacts/${contact.slug}/edit`)

    return contact.error
}