import { redirect } from "react-router-dom"
import { UseAuthContext } from "../authHooks/useAuthContext"


export const UseDestroyContacts = async (slug) => {
    const { user } = UseAuthContext()

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'application/json'
        }            
    }

    const deleteContact = await fetch(`/api/contacts/${slug}`, options)
    const data = await deleteContact.json()

    if (deleteContact.ok) return redirect("/")

    return data
}