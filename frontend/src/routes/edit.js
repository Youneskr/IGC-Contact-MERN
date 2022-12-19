import React from 'react'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'


export const action = async ({params, request}) => {

    const formData = await request.formData()
    const updates = Object.fromEntries(formData)

    const options = {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            'Content-Type' : 'application/json'
        }
    }

    await fetch(`/api/contacts/${params.slug}`, options)

    return redirect(`/contacts/${params.slug}`)

}


const Edit = () => {
    const contact = useLoaderData()
    const navigate = useNavigate()

    return (
        <Form method='post' id='contact-form'>
            <p>
                <span>Nom</span>
                <input
                    placeholder="Sponsor"
                    aria-label="Sponsor"
                    type="text"
                    name="sponsor"
                    defaultValue={contact.sponsor}
                />
            </p>

            <label>
                <span>Numero</span>
                <input
                    type="text"
                    name="num"
                    placeholder="+216 26 XXX XXX"
                    defaultValue={contact.num}
                />
            </label>

            <label>
                <span>Image URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Image URL"
                    type="text"
                    name="img"
                    defaultValue={contact.img === 'https://idendate.sirv.com/isitcom_google_club/igc-contacts/default%20picture.png' ? '' : contact.img}
                />
            </label>

            <label>
                <span>Responsable</span>
                <input
                    placeholder="Mr. xxx"
                    aria-label="Responsable"
                    type="text"
                    name="res"
                    defaultValue={contact.res}
                />
            </label>

            <label>
                <span>Adresse</span>
                <input
                    placeholder="Sousse, khzema.."
                    aria-label="Adresse"
                    type="text"
                    name="address"
                    defaultValue={contact.res}
                />
            </label>

            <label>
                <span>Les notes</span>
                <textarea
                    name="note"
                    placeholder=''
                    defaultValue={contact.note}
                    rows={6}
                />
            </label>

            <p className=''>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </p>


        </Form>
    )
}

export default Edit