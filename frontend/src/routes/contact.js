// import { UseFetchContact } from '../hooks/contactsHooks/useFetchContacts'


export const loader = async ({params}) => {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            'Content-Type' : 'application/json'
        }            
    }

    const response = await fetch(`/api/contacts/${params.slug}`, options)
    const contact = await response.json()

    if (!response.ok) throw new Response ('',   {
        status: 404,
        statusText: contact.error,
    })

    return contact
}
