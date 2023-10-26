import "../blocks/Page.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import ItemModal from "./ItemModal";
import { getForecastWeather, parseWeatherData } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
  editProfile,
} from "../utils/api";
import { register, signIn, checkToken } from "../utils/auth";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import EditProfileModal from "./EditProfileModal";
import DeleteCardModal from "./DeleteCardModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userRegisterModal, setUserRegisterModal] = useState(false);
  const [userLoginModal, setUserLoginModal] = useState(false);
  const [token, setToken] = React.useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [city, setCity] = useState("");
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const [userEditProfileModal, setUserEditProfileModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    addClothingItem({
      name,
      imageUrl,
      weather,
      token,
    })
      .then((res) => {
        setCards([res?.data, ...cards]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleDeleteItem = () => {
    setIsDeleting(true);
    deleteClothingItem(selectedCard._id, token)
      .then(() => {
        const filteredCard = cards.filter(
          (card) => card._id !== selectedCard._id
        );
        setCards(filteredCard);
        handleCloseModal();
        setDeleteCardModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleLogin = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          const userInfo = checkToken(res.token);
          setToken(res.token);

          return userInfo;
        } else {
          throw { message: "Error: Invalid credentials entered" };
        }
      })
      .then((userInfo) => {
        setCurrentUser({
          data: {
            name: userInfo?.data?.name,
            avatar: userInfo?.data?.avatar,
            _id: userInfo?.data?._id,
          },
        });
        setIsLoggedIn(true);
        handleCloseModal();
        setUserLoginModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then((res) => {
        console.log(res);

        handleLogin({ email, password });
        handleCloseModal();
        setUserRegisterModal(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    setIsLoading(true);
    editProfile({ name, avatar, token })
      .then((res) => {
        return res;
      })
      .then((res) => {
        setCurrentUser(res);
        handleCloseModal();
        setUserEditProfileModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openDeleteModal = () => {
    setDeleteCardModal(true);
    handleCloseModal();
  };

  const openRegistrationModal = () => {
    setUserRegisterModal(true);
    handleCloseModal();
  };

  const openLoginModal = () => {
    setUserLoginModal(true);
    handleCloseModal();
  };

  const openEditProfileModal = () => {
    setUserEditProfileModal(true);
    handleCloseModal();
  };

  const handleLikeClick = (id, isLiked, user) => {
    const token = localStorage.getItem("jwt");
    isLiked
      ? removeCardLike(id, user, token)
          .then((updatedCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err))
      : addCardLike(id, user, token)
          .then((updatedCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard.data : c))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const cityName = data && data.name;
        setCity(cityName);
        const temperature = parseWeatherData(data);
        setTemp(temperature);

        getClothingItems()
          .then((items) => {
            setCards(items.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
      checkToken(storedToken)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
          return res;
        })
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(false);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header
              cityName={city}
              onCreateModal={handleCreateModal}
              handleRegistration={openRegistrationModal}
              isLoggedIn={isLoggedIn}
              handleLogin={openLoginModal}
            />
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Switch>
                  <ProtectedRoute path="/profile" userLoggedIn={isLoggedIn}>
                    <Profile
                      cards={cards}
                      onSelectCard={handleSelectedCard}
                      onCreateModal={handleCreateModal}
                      onEditProfile={openEditProfileModal}
                      userLoggedIn={isLoggedIn}
                      onCardLike={handleLikeClick}
                      handleLogOut={handleLogout}
                    />
                  </ProtectedRoute>
                  <Route path="/">
                    <Main
                      cards={cards}
                      weatherTemp={temp}
                      onSelectCard={handleSelectedCard}
                      onCardLike={handleLikeClick}
                      userLoggedIn={isLoggedIn}
                    />
                  </Route>
                </Switch>
                <Footer />
                {activeModal === "create" && (
                  <AddItemModal
                    handleCloseModal={handleCloseModal}
                    onAddItem={handleAddItemSubmit}
                    isOpen={activeModal === "create"}
                  />
                )}
                {activeModal === "preview" && (
                  <ItemModal
                    selectedCard={selectedCard}
                    handleCloseModal={handleCloseModal}
                    onOpenDeleteModal={openDeleteModal}
                    isOpen={activeModal === "preview"}
                  />
                )}
                {deleteCardModal && (
                  <DeleteCardModal
                    handleCloseModal={() => {
                      setDeleteCardModal(false);
                    }}
                    handleDelete={handleDeleteItem}
                    isOpen={deleteCardModal}
                    isLoading={isDeleting}
                  />
                )}
                {userRegisterModal && (
                  <RegisterModal
                    isOpen={userRegisterModal}
                    onRegisterUser={handleRegister}
                    handleCloseModal={() => {
                      setUserRegisterModal(false);
                    }}
                    switchToLoginModal={() => {
                      setUserLoginModal(true);
                      setUserRegisterModal(false);
                    }}
                  />
                )}
                {userLoginModal && (
                  <LoginModal
                    isOpen={userLoginModal}
                    onLoginUser={handleLogin}
                    handleCloseModal={() => {
                      setUserLoginModal(false);
                    }}
                    switchToRegisterModal={() => {
                      setUserLoginModal(false);
                      setUserRegisterModal(true);
                    }}
                  />
                )}
              </>
            )}
            {userEditProfileModal && (
              <EditProfileModal
                isOpen={userEditProfileModal}
                handleCloseModal={() => {
                  setUserEditProfileModal(false);
                }}
                onEditProfile={handleEditProfile}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
