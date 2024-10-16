import React, {useEffect} from "react";

function ImagePopup({isOpen, card, onClose}) {

  useEffect(()=>{
    const handleEscClose = (evt) => {
      if (evt.key == 'Escape'){
        onClose()
      }
    };
    const handleClickOutside = (evt) => {
      if (evt.target === document.querySelector(`.image-zoom`)){
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleEscClose)
      document.removeEventListener('click', handleClickOutside)
    }
  },[onClose]);
    
    if (!card) return null;

    return (
        <div className={`image-zoom ${isOpen ? "image-zoom_opened" : ""} form`}>
            <div className={`image-zoom__group`}>
                <h2 className={`image-zoom__icon-close image-zoom__icon-close:hover`} onClick={onClose}>+</h2>
                <img className="image-zoom__container" src={card.link} alt={card.name}/>
                    <h2 className={`image-zoom__text`} >{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup