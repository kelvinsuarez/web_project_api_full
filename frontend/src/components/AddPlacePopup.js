import React,{useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "../utils/FormValidator";
import escapeHTML from "escape-html";

function AddPlacePopup (props){
    const titleRef = useRef(null);
    const fileInputRef = useRef(null);
    const formRef =  useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const formValidator = new FormValidator({
            inputSelector: ".form-imput-text",
            submitButtonSelector: ".popup-save",
            buttonSaveOff: "popup__button-save-off",
            inputErrorClass: "form__input-text_type_error",
            errorClass: "form-input-show-error"
        }, formRef.current);
        formValidator.enableValidation();
    }, []);

    const handleFileChange = () => {
        const file = fileInputRef.current.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreview(previewURL);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const file = fileInputRef.current.files[0];
        if (!file) {
            alert("Debes seleccionar una imagen.");
            return;
        }

        const formData = new FormData();
        formData.append("name", escapeHTML(titleRef.current.value));
        formData.append("image", file);

        props.onAddCard(formData);
    };
    return(
        <PopupWithForm 
            ref={formRef}
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            name="-place" id="popup-place_container" 
            title="Nuevo Lugar" 
            onSubmit={handleSubmit}
        >
            <input 
                type="text"
                id="titulo"
                placeholder="Titulo"
                minLength="2" maxLength="30"
                defaultValue=""
                className="popup-place__imput-text popup-place__imput-text_title form-imput-text"
                required
                autoComplete="off"
                ref={titleRef}
            />
            <span className="titulo-error form-input-show-error"></span>

            <input 
                type="file"
                id="archivo"
                accept="image/*"
                className="popup-place__imput-text popup-place__imput-text_image form-imput-text"
                required
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <span className="archivo-error form-input-show-error"></span>
            {imagePreview && (<img src={imagePreview} alt="Preview" style={{width: "15%", marginTop: "1px", borderRadius: "4px" }}/>)}
            <button className="popup-save popup-place__button-save popup-place__button-save:hover" disabled>Guardar</button>
        </PopupWithForm>
    )
};

AddPlacePopup.propTypes = {
    onAddCard: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddPlacePopup;