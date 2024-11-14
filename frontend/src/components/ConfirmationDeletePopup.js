import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

function ConfirmationDeletePopup (props){
    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdateDelete()
    } 
    return(
        <PopupWithForm 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            name="-confirmation" 
            id="" 
            title="¿Estas seguro/a?"
        >
            <button className="popup-confirmation__button-delete" onClick={handleSubmit}>si</button>
        </PopupWithForm>
    )
}

ConfirmationDeletePopup.propTypes ={
    onUpdateDelete: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ConfirmationDeletePopup;