import React, {useEffect, forwardRef} from "react";
import escapeHTML from "escape-html";

const PopupWithForm = forwardRef((props, ref) => {
    useEffect(() =>{
       const handleEscClose = (evt) => {
            if (evt.key == 'Escape'){
                props.onClose()
            }
        };

        const handleClickOutside = (evt) => {
            if (evt.target === document.querySelector(`.popup${props.name}`)){
                props.onClose();
            }
        };

        document.addEventListener("keydown", handleEscClose);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleEscClose);
            document.removeEventListener("click", handleClickOutside);
        }
    }, [props.onClose, props.name])
    return (
        <div className={`popup${props.name} ${props.isOpen ? "popup-opened" : ""} form`} id={props.id}>
            <div className={`popup${props.name}__group`}>
                <h2 className={`popup${props.name}__icon-close popup${props.name}__icon-close:hover`} onClick={props.onClose}>+</h2>
                <form ref={ref} name={props.name} className={`popup${props.name}__container form-popup`} noValidate onSubmit={props.onSubmit}>
                    <h2 className={`popup${props.name}__text`} >{escapeHTML(props.title)}</h2>
                    {props.children}
                </form>
            </div>
        </div>
    );
});

export default PopupWithForm