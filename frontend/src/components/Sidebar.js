import React, { useEffect, useState } from 'react'
import { 
    Form, 
    Link, 
    NavLink, 
    useActionData, 
    useLoaderData, 
    useNavigation, 
    useSubmit 
} from 'react-router-dom'
import { useAuthContext } from '../hooks/authHooks/useAuthContext'

const Sidebar = () => {
    const[isCollapse, setIsCollapse] = useState(false)

    const navigation = useNavigation()

    const submit = useSubmit()

    const { dispatch } = useAuthContext()

    const searching = 
        navigation.location && 
        new URLSearchParams(navigation.location.search).has("q")


    const {contacts, q} = useLoaderData()
    const errorMessage = useActionData()


    const handleOnChange = () => {
        document.getElementById('error').innerHTML = ''
    }

    useEffect(() => {
        document.getElementById("q").value = q
    }, [q])

    const logout = () => {
        dispatch({type: 'LOGOUT'})
    }

    return (
        <nav id="sidebar" className= {isCollapse ? 'active' : ''}>
            <div className="custom-menu">
                <button 
                    type="button" 
                    id="sidebarCollapse" 
                    className="btn btn-primary"
                    onClick={() => setIsCollapse(prev => !prev)}
                >
                    <i className="fa fa-bars"></i>
                    <span className="sr-only">Toggle Menu</span>
                </button>
            </div>
    
            <div className="px-4 pt-2">
                <h3 className='d-flex justify-content-between align-items-center'>
                    <Link to='/' className="logo fs-3">
                        IGC - SPONSORS <span>Contacts</span>
                    </Link>
                    
                    <button onClick={logout}><i class="fa-solid text-white fs-6 fa-arrow-right-from-bracket"></i></button>
                    
                </h3>

                <Form id="search-form" className='mb-4' role="search">
                    <input
                        id="q"
                        aria-label="Search contacts"
                        placeholder="Search"
                        defaultValue={q}
                        type="search"
                        name="q"
                        className={searching ? "loading" : ""}
                        onChange={e => {
                            const isFirstSearch = q==null
                            submit(e.currentTarget.form, {replace: !isFirstSearch})
                        }}
                    />
                    <div id="search-spinner" aria-hidden hidden={!searching} />
                    <div className="sr-only" aria-live="polite"> </div>
                </Form>

                    {
                        contacts.length ? (
                                <ul className="list-unstyled components mb-5">
                                    { contacts.map(contact => (
                                        <li key={contact._id} className="">
                                            <NavLink 
                                                to={`/contacts/${contact.slug}`} 
                                                // className='d-flex align-items-center'
                                                className={({ isActive, isPending }) => isActive ? 'active d-flex align-items-center' : isPending ? 'pending d-flex align-items-center' : 'd-flex align-items-center' }
                                            >
                                                <span className="fa-regular fa-address-card mr-3"></span> 
                                                <div >
                                                    <div className="sponsor">{contact.sponsor}</div>
                                                    <div className="num">{contact.num}</div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    )) }
                                </ul>
        
                            ) : (
                                <p className='text-warning text-center'>
                                    <i>No contacts</i>
                                </p>
                            )
                    }

                <div className="mb-3">
                    <h3 
                        className="h6 mb-3"
                        style={{color: '#f9bc00'}}
                    >
                        Nouveau contact :
                    </h3>
                    <Form method='post' className="subscribe-form add-form">
                        <div className="form-group d-flex">
                            <div className="icon"><span className="icon-paper-plane"></span></div>
                            <div className=''>
                                <input 
                                    type="text" 
                                    id='sponsor'
                                    name='sponsor'
                                    onChange={handleOnChange}
                                    className="form-control text-white mb-3 w-100" 
                                    placeholder="Ajouter un contact" 
                                />
                                { errorMessage && <p id='error' className='text-warning text-center'>{errorMessage}</p> }
                                <button type='submit' style={{color: '#f9bc00', border: '1px solid '}} className='btn btn-primary'>Ajouter</button>
                            </div>
                        </div>
                    </Form>
                    
                </div>

            </div>
        </nav>
    )
    }

export default Sidebar