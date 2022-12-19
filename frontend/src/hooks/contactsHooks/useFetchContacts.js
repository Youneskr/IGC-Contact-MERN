import { UseAuthContext } from "../authHooks/useAuthContext"

// Fetch All Contacts
export const UseFetchContacts = async (q) => {
    const { user } = UseAuthContext()

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'application/json'
        }            
    }
    
    const response = await fetch('/api/contacts', options)
    const data = await response.json()

    if (q) {
        // eslint-disable-next-line
        const contacts = data.filter(contact => contact.sponsor .toLowerCase().includes(q.toLowerCase()))
        return contacts
    }
    
    return data
}

// Fetch Single Contact
export const UseFetchContact = async (slug) => {
    const { user } = UseAuthContext()

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type' : 'application/json'
        }            
    }

    const response = await fetch(`/api/contacts/${slug}`, options)
    const contact = await response.json()

    if (!response.ok) throw new Response ('',   {
        status: 404,
        statusText: contact.error,
    })

    return contact
}