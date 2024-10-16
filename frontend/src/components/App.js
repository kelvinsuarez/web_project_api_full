import React, { useEffect} from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmationDeletePopup from './ConfirmationDeletePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth.js'



function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(true);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(true);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(true);
  const [isConfirmacionPopupOpen, setIsConfirmacionPopupOpen] = React.useState(true);
  const [isOpenImagePopup, setIsOpenImagePopup] = React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  

    useEffect(() => {
        const fetchData = async () => {
            try {
              const userData = await api.getUserInfoFronServer();
              setCurrentUser(userData)

              const cardInfo = await api.getCards();
              setCards(cardInfo)
              
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
        HandleTokenCheck();
    }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(false);
    
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(false);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(false)
  }

  const handleConfirmationClick =(card) => {
    setSelectedCard(card);
    setIsConfirmacionPopupOpen(false)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpenImagePopup(false)
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(true);
    setIsEditProfilePopupOpen(true);
    setIsAddPlacePopupOpen(true);
    setIsConfirmacionPopupOpen(true);
    setIsOpenImagePopup(true);
  }


  const handleCardDelete = async () => {
    try {
      await api.deleteCardFromServer(selectedCard._id);
      setCards(cards.filter((card) => card._id !== selectedCard._id));
      closeAllPopups();
    } catch (error) {
      console.error ("error deleting card", error);
    }
  };

  const handleCardLike = async (cardId, isLiked) => {
    try {
      const newCard = isLiked ? await api.deleteLikeFromCard(cardId) : await api.showLikeFromCard(cardId);
      setCards((cards) =>
        cards.map((card) => (card._id === cardId ? newCard : card))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updataUser = await api.saveDataToServer(userData.name, userData.about);
      setCurrentUser(updataUser);
      closeAllPopups();
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  const handleUpdateAvatar = async (avatar) => {
    try {
      const updateAvatar = await api.updateImageProfile(avatar);
      setCurrentUser(updateAvatar)
      closeAllPopups();
    } catch (err) {
      console.error("Error updating avatar pic:", err);
    }
  };

  const handleAddCard = async (card) => {
    try{
      const addCard = await api.addNewCardToServer(card);
      setCards([addCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.error("Error updating new card:", err);
    }
  };

  const handleLogin = (e) => {
    setIsLoggedIn(true)
  }

  const HandleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true)
          navigate('/profile')
        }
      })
    }
  }

  return (
    <CurrentUserContext.Provider value ={currentUser}>
      <div className="App">
        <div className="root">
        <Routes>
          <Route path="/signin" element={<Login handleLogin={handleLogin} />}/>
          <Route path="/signup" element={<Register/>}/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}>
                    < Header />
  
                    < Main 
                      onEditProfileClick={handleEditProfileClick} 
                      onAddPlaceClick={handleAddPlaceClick} 
                      onEditAvatarClick={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onConfirmationDelete={handleConfirmationClick}
                      onCardLike={handleCardLike}
                    />

                    <Footer/>

                    <ImagePopup
                      isOpen={isOpenImagePopup}
                      card={selectedCard}
                      onClose={closeAllPopups}
                    />

                    <ConfirmationDeletePopup
                      isOpen={isConfirmacionPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateDelete={handleCardDelete}
                    />

                    <EditAvatarPopup 
                      isOpen={isEditAvatarPopupOpen} 
                      onClose={closeAllPopups} 
                      onUpdateAvatar={handleUpdateAvatar}
                    />

                    <EditProfilePopup 
                      isOpen={isEditProfilePopupOpen} 
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />

                    <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddCard={handleAddCard}
                    />
                  
                </ProtectedRoute>
            }
          />
          <Route path="/" element={isLoggedIn? <Navigate to='/profile'/> : <Navigate to='/signin'/>}/>
        </Routes>
        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
