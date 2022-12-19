import { redirect } from "react-router-dom"

export const action = async ({params}) => {

    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            'Content-Type' : 'application/json'
        }            
    }

    const deleteContact = await fetch(`/api/contacts/${params.slug}`, options)
    const data = await deleteContact.json()

    if (deleteContact.ok) return redirect("/")

    return data
}