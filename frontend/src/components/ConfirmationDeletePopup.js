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
            onSubmit={handleSubmit}
            name="-confirmation" 
            id="" 
            title="¿Estas seguro/a?"
            
        >
        <button type="submit" className="popup-confirmation__button-delete">si</button>
        </PopupWithForm>
    )
}

ConfirmationDeletePopup.propTypes ={
    onUpdateDelete: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ConfirmationDeletePopup;