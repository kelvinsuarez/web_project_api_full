import React,{useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "../utils/FormValidator";

function EditAvatarPopup (prosp){
    const AvatarRef = useRef(null);
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
        evt.preventDefault();
        prosp.onUpdateAvatar(AvatarRef.current.value)
    }
    return(
        <PopupWithForm 
            ref={formRef}
            isOpen={prosp.isOpen} 
            onClose={prosp.onClose} 
            name="-image-profile" 
            id="popup-image-profile_container" 
            title="Cambiar foto de perfil"
            onSubmit={handleSubmit}
        >
            <input 
                type="url"
                id="url-profile"
                placeholder="Imagen URL"
                minLength="2" maxLength="200"
                defaultValue=""
                className="popup-image-profile__imput-text form-imput-text"
                required
                autoComplete="off"
                ref={AvatarRef}
            />
            <span className="url-profile-error form-input-show-error"></span>
            <button className="popup-save popup-image-profile__button-save popup-image-profile__button-save:hover" disabled>Guardar</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup