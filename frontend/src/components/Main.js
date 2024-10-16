import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import VectorLapiz  from '../images/profile/lapiz.svg';
import VectorCruz  from '../images/profile/button-add.svg';
import Card from './Card.js';


function Main({ onEditProfileClick, 
                onAddPlaceClick, 
                onEditAvatarClick, 
                onCardClick,
                onCardLike,
                cards, 
                onConfirmationDelete }) {
    const currentUser = useContext(CurrentUserContext);
    return (
        <>
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__elipce">
                        <div className="profile__image-edit">
                            <img className="profile__edit-image-button-vector" src={VectorLapiz} onClick={onEditAvatarClick} alt="Edit Avatar"/>
                        </div>
                        <img className="profile__image"  style={{ backgroundImage: `url(${currentUser.avatar})` }}/>
                    </div>
                </div>
                <div className="profile__into">
                    <h2 className="profile__title">{currentUser.name}</h2>
                    <div className="profile__edit-button-square profile__edit-button-square_grey" onClick={onEditProfileClick}> </div>
                    <div className="profile__edit-button-square" id="edit-button">
                        <img className="profile__edit-button-vector" src={VectorLapiz} alt="imagen de silueta de lapiz"/>
                    </div>
                    <h3 className="profile__subtitle">{currentUser.about}</h3> 
                </div>
                <div className="profile__add-button profile__add-button_grey" onClick={onAddPlaceClick}> </div>
                <div className="profile__add-button profile__add-button:hover">
                    <img className="profile__add-button-cross" src={VectorCruz} alt="cruz"/>
                </div>
            </section>

            <section className="cards">
                
                {cards.map((cardItem) => (
                    <Card
                        key={cardItem._id}
                        card={cardItem}
                        onCardLike={onCardLike}
                        onConfirmationDelete={onConfirmationDelete} 
                        handleCardClick={onCardClick}
                    />
                ))}
            </section>

        </>
    )
}

export default Main;