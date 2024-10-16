import React, {useState} from "react";
import * as auth from '../utils/auth';
import Logo from '../images/header/Vector.svg';
import { NavLink, useNavigate } from "react-router-dom";
import InfoTooltip from './InfoTooltip.js';
import escapeHTML from "escape-html";

function Register () {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('')
    const [isTooltipOpen, setIstooltipOpen] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsError(false);

        const sanitizedValues = {
            email: escapeHTML(values.email),
            password: escapeHTML(values.password),
        };

        auth.register(sanitizedValues)
        .then((res) => {
            navigate('/signin')
        })
        .catch((err) => {
            console.log(err);
            if(err.includes('usuario ya está registrado')) {
                setError('Este usuario ya está registrado. Por favor, intenta con otro correo.');
            } else if (err.includes('400')) {
                setError('Uno de los campos se rellenó de forma incorrecta.');    
            } else {
                setError('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
            }
            setIsError(true);
            setIstooltipOpen(true);
         }); 
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value});
    }

    const handleCloseTooltip = () => {
        setIstooltipOpen(false);
    }
    return(
        <>
           <header className="header">
                <img className="header__logo" src={Logo} alt="logo around the U.S"/>
                <nav onClick={() => {navigate('/signin')}} className="header__nav">Inicia sesión</nav>
                <hr className="header__line"/>
            </header>
            <div className="signup">
                <form name="profile" className="signup__container">
                    <h2 className="signup__text" >Regístrate</h2>
                    <input type="text" 
                        className="signup__imput-text"
                        name="email"
                        placeholder="correo_electronico"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <input type="password" 
                        name="password"
                        placeholder="contraseña"
                        className="signup__imput-text"
                        value={values.password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <button onClick={handleSubmit} className=" signup__button-save">Regístrate</button>
                    
                    <NavLink to='/signin' className="signup__link-register">¿Ya eres miembro? Inicia sesión aquí</NavLink>
                   
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

export default Register;