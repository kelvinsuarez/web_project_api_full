import React, { useEffect, useState, useContext, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import FormValidator from "../utils/FormValidator";

function EditProfilePopup (props){
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);
    const formRef =  useRef(null);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    useEffect(() => {
        const formValidator = new FormValidator({
            inputSelector: ".form__imput-text",
            submitButtonSelector: ".popup-save",
            buttonSaveOff: "popup-profile__button-save-off",
            inputErrorClass: "form__input-text_type_error",
            errorClass: "form-input-show-error"
        }, formRef.current);
        formValidator.enableValidation();
        
    }, [props.isOpen]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        })
    }
return(
    
    <PopupWithForm 
        ref={formRef}
        isOpen={props.isOpen} 
        onClose={props.onClose} 
        name="-profile" 
        id="popup-profile_container" 
        title="Editar Perfil"
        onSubmit={handleSubmit}
    >
    <input 
      type="text" 
      id="nombre"
      name="nombre"
      placeholder="Nombre" 
      defaultValue={name}
      minLength="2" 
      maxLength="40" 
      className="popup-profile__imput-text popup-profile__imput-text_name form__imput-text"
      required
      autoComplete="off"
      onChange={handleNameChange}
    />
    <span className="nombre-error form__input-show-error"></span>
    <input 
      type="text" 
      id="acerca"
      name="acerca"
      placeholder="A cerca de mi"
      defaultValue={description}
      minLength="2" 
      maxLength="200"
      className="popup-profile__imput-text popup-profile__imput-text_job form__imput-text"
      required
      autoComplete="off"
      onChange={handleDescriptionChange}
    />
    <span className="acerca-error form__input-show-error"></span>
    <button className="popup-save popup-profile__button-save popup-profile__button-save:hover" id="button-save" disabled>Guardar</button>
  </PopupWithForm>
    
)
};
export default EditProfilePopup