import React, { useState } from "react";
import Logo from '../images/header/Vector.svg';
import{ NavLink, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js';
import escapeHTML from "escape-html";

function Login ({handleLogin}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isTooltipOpen, setIstooltipOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'email') {
            setEmail(value);
        }else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsError(false)
        if (!email || !password) {
            setError('Por favor, rellena ambos campos');
            setIsError(true);
            setIstooltipOpen(true);
            return;
        }

        const sanitizedEmail = escapeHTML(email);
        const sanitizedPassword = escapeHTML(password);

        setIstooltipOpen(true);
        auth.authorize(sanitizedEmail, sanitizedPassword)
        .then((data) => {
            if (data.token) {
                console.log('Token JWT desde el componente Login:', data.token);
                setEmail('');
                setPassword('');
                handleLogin()
                navigate('/profile')
            }
        })
        .catch((err) => {
            console.log(err);
            if(err.includes('400')) {
                setError('No se ha proporcionado uno o más campos')
            } else if(err.includes('No se ha encontrado al usuario')) {
                setError('No se ha encontrado al usuario con el correo electrónico especificado')
            } else {setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.')};
            setIsError(true)
            setIstooltipOpen(true)
        });
    };
    const handleCloseTooltip = () => {
        setIstooltipOpen(false);
    }

    return(
        <>
            <header className="header">
                <img className="header__logo" src={Logo} alt="logo around the U.S"/>
                <nav onClick={() => {navigate('/signup')}} className="header__nav">Regístrate</nav>
                <hr className="header__line"/>
            </header>
            <div className="login">
                <form name="profile" className="login__container" noValidate>
                    <h2 className="login__text" >Inicia sesión</h2>
                    <input type="text" 
                        className="login__imput-text"
                        name="email"
                        placeholder="correo_electronico" 
                        value={email}
                        onChange={handleChange}
                        
                    />
                    <input type="password"
                        className="login__imput-text" 
                        name="password"
                        placeholder="contraseña"
                        value={password}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit} className=" login__button-save">Inicia sesión</button>
                    <NavLink to='/signup' className="signup__link-register">¿Aún no eres miembro? Regístrate aquí</NavLink>
                </form>
            </div>
            <InfoTooltip 
                isOpen={isTooltipOpen}
                onClose={handleCloseTooltip}
                isError={isError} 
                message={error}
            />
        </>
    )
}

export default Login;