import { Outlet, redirect, useNavigation } from 'react-router-dom';
import Sidebar from '../components/Sidebar'

export const loader = async ({request}) => {

    if (!localStorage.getItem('user')) return redirect('/login')
    
    const url = new URL(request.url)
    const q =url.searchParams.get('q')
        
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            'Content-Type' : 'application/json'
        }            
    }
    
    const response = await fetch('/api/contacts', options)
    const data = await response.json()

    if (q && data.length > 0) {
        // eslint-disable-next-line
        const contacts = data.filter(contact => contact.sponsor .toLowerCase().includes(q.toLowerCase()))
        return {contacts, q}
    }
    const contacts = data
    return {contacts, q}
}

export const action = async ({request}) => {

    const formData = await request.formData()
    const create = Object.fromEntries(formData)

    const options = {
        method: 'POST',
        body: JSON.stringify(create),
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            'Content-Type' : 'application/json'
        }   
    }

    const response = await fetch('/api/contacts', options)

    const contact = await response.json()

    if (response.ok) return redirect(`/contacts/${contact.slug}/edit`)

    const errorMessage = contact.error

    return errorMessage
}

const Root = () => {
    const navigation = useNavigation()
    
    return (
        <div className="wrapper d-flex align-items-stretch">
			<Sidebar />

            <div 
                id="content" 
                className={ navigation.state==='loading' ? 'p-4 p-md-5 pt-5 loading' : 'p-4 p-md-5 pt-5' }
                >
                <Outlet />
            </div>
		</div>
    )
}

export default Root