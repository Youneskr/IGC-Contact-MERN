import React from 'react'
import { useLoaderData, Form } from 'react-router-dom'

const Contact = () => {
    const contact = useLoaderData()

    return (
        <div>
            <div id="contact">
                <div>
                    <img
                    className='img-fluid'
                    key={contact.slug}
                    src={contact.img}
                    alt='contact'
                    />
                </div>

                <div>
                    <h1>
                        { contact.sponsor }
                        {" "}
                        {/* <Favorite contact={contact} /> */}
                    </h1>

                    {contact.num && (
                        <p>
                            <a
                            target="_blank"
                            rel="noreferrer"
                            href={`https://twitter.com/${contact.twitter}`}
                            >
                            {contact.num}
                            </a>
                        </p>
                    )}

                    {contact.note && <p style={{ whiteSpace: 'pre' }}>{contact.note}</p>}

                    <div>
                        <Form action="edit">
                            <button type="submit">Edit</button>
                        </Form>
                        <Form
                            method="post"
                            action="destroy"
                            onSubmit={(event) => {
                            if (
                            !window.confirm(
                            "Please confirm you want to delete this record."
                            )
                            ) {
                                event.preventDefault();
                            }
                            }}>
                            <button type="submit">Delete</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact