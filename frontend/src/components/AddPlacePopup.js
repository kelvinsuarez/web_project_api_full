import React,{useRef, useEffect} from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "../utils/FormValidator";
import escapeHTML from "escape-html";

function AddPlacePopup (props){
    const titleRef = useRef(null);
    const urlRef = useRef(null);
    const fileRef = useRef(null);
    const formRef =  useRef(null);

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

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const newCard = {
            name: escapeHTML(titleRef.current.value),
            link: escapeHTML(urlRef.current.value),
            file: fileRef.current.files[0]
        }
        props.onAddCard(newCard);
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
                id="url"
                placeholder="Imagen URL"
                minLength="2" maxLength="200"
                defaultValue=""
                className="popup-place__imput-text popup-place__imput-text_image form-imput-text"
                required
                autoComplete="off" 
                ref={urlRef}
            />
            <span className="url-error form-input-show-error"></span>

            <label htmlFor="file-input" className="file-upload-label">Seleccionar Foto</label>
            <input 
                type="file" 
                id="file-input" 
                className="popup-place__imput-file form-imput-file" 
                ref={fileRef} 
                style={{ display: 'none' }} 
            />
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