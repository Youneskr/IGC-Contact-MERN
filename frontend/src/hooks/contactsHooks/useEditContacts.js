import { redirect } from "react-router-dom"
import { UseAuthContext } from "../authHooks/useAuthContext"


export const UseEditContacts = async (updates, slug) => {
    const { user } = UseAuthContext()

    const options = {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'application/json'
        }
    }

    await fetch(`/api/contacts/${slug}`, options)

    return redirect(`/contacts/${slug}`)
}