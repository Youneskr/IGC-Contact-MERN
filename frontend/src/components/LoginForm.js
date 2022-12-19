import { useState } from 'react'
import { UseLogin } from '../hooks/authHooks/useLogin'
import  './login.css'

const LoginForm = () => {
    const { login, isPending, error } = UseLogin()

    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async e => {
        e.preventDefault()
        await login(pseudo, password)
    }

    return (
        <div className="wrap-login100 p-4">
            <form className="login100-form validate-form" onSubmit={e => handleLogin(e)}>

                <span className="login100-form-avatar">
                    <img src="https://idendate.sirv.com/isitcom_google_club/igc-contacts/logo.png" alt="AVATAR" />
                </span>

                <div className="wrap-input100 validate-input m-t-75 m-b-35">
                    <label className="input100" htmlFor="email">Pseudo: </label>
                    <input
                        className="input100" 
                        type="text" 
                        name="pseudo" 
                        placeholder='admin'
                        onChange={e => setPseudo(e.target.value)}
                    />
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input mt-5 m-b-50" data-validate="Enter password">
                <label className="input100"  htmlFor="password">Password: </label>
                    <input 
                        className="input100" 
                        type="password" 
                        name="password" 
                        onChange={e => setPassword(e.target.value)}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    />
                    <span className="focus-input100"></span>
                </div>

                { error && <span className="input100 text-center text-danger">{ error }</span> }

                <div className="container-login100-form-btn mt-3">
                    <button disabled={isPending} type='submit' className="login100-form-btn">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm