import React from "react";
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

export default ConfirmationDeletePopup;