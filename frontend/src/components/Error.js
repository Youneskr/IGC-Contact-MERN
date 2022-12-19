import { useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError()

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className='text-danger'><i><b>{error.statusText || error.message}</b></i></p>
        </div>
    )
}

export default Error