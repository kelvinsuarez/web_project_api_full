import React, { useContext } from 'react';
import trash from '../images/cards/trash-all.svg';
import likeIcon from '../images/cards/like-grey.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onConfirmationDelete, handleCardClick }) {
    const currentUser = useContext(CurrentUserContext)
    const {name, link, _id, likes = [], owner} = card;
    
    
    const isOwn = owner && currentUser ? owner._id === currentUser._id : false;
    const isLiked = likes.some((like) => like._id === currentUser._id);

    const cardDeleteButtonClassName = `cards__element-trash ${isOwn ?'cards__element-trash_visible' : 'cards__element-trash_hidden'}`;
    
    const handleImageClick = () => {
        handleCardClick(card);
    };
    

    const handleDeleteClick = () => {
      
        onConfirmationDelete(card);
    
    };

    const handleLikeClick = () => {
        onCardLike(_id, isLiked);
      };
    
    return(
        <>
            <div className="cards__element" data-id={_id}>
                <img 
                className="cards__element-pic" 
                src={link} 
                alt={name}
                onClick={handleImageClick}
                />
                
                {isOwn && (<img 
                                    className={cardDeleteButtonClassName}
                                    src={trash} 
                                    alt="basurero"
                                    onClick={handleDeleteClick}
                                    />)}
                
                <div className="cards__element-text-container">
                    <h2 className="cards__element-text">
                        {name}
                    </h2>
                    <div className="cards__element-like cards__element-like:hover" >
                        <img src={likeIcon} alt="vector corazon" onClick={handleLikeClick}/>
                        <div className={`cards__element-like-black ${ isLiked ? '' : 'cards__element-like-black_on'}`}
                        onClick={handleLikeClick}>
                            <div className="cards__element-like-right-rectangle cards__element-like-parts"></div>
                            <div className="cards__element-like-left-rectangle cards__element-like-parts"></div>
                            <div className="cards__element-like-right-circle cards__element-like-parts"></div>
                            <div className="cards__element-like-left-circle cards__element-like-parts"></div>
                            <div className="cards__element-like-center-circle cards__element-like-parts"></div>
                        </div>
                    </div>
                    <span className="cards__element-like-counter" >{likes.length}</span>
                </div>
            </div>
        </>
    )
}
export default Card;