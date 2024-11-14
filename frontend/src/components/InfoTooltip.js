import React from "react";
import PropTypes from "prop-types";
import Union from '../images/Icons/Union.png'
import UnionX from '../images/Icons/UnionX.png'

function InfoTooltip ({ isOpen, onClose, message, isError })  {
    const textAprov = "¡Correcto! Ya estás registrado."
    return (
        <div className={`popup-InfoTooltip ${isOpen ? '' : 'popup-opened'}`}>
            <div className='popup-InfoTooltip__group'>
                <h2 className='popup-InfoTooltip__icon-close popup-InfoTooltip__icon-close:hover' onClick={onClose}>+</h2>
                <div className='popup-InfoTooltip__container'>
                    <img src={isError ? UnionX : Union} className="popup-InfoTooltip__icon" alt="Icono" />
                    <h2 className='popup-InfoTooltip__text'>{isError ? message : textAprov}</h2>
                </div>
            </div>
        </div>
    );
};

InfoTooltip.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
}

export default InfoTooltip