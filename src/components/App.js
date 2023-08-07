// import logo from "./logo.svg";
import "../blocks/App.css";
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
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import api from "../utils/itemsApi";
import { register, signIn, checkToken } from "../utils/auth";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import EditProfileModal from "./EditProfileModal";
import DeleteCardModal from "./DeleteCardModal";
import LogoutModal from "./LogoutModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userRegisterModal, setUserRegisterModal] = useState(false);
  const [userLoginModal, setUserLoginModal] = useState(false);
  const [token, setToken] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [deleteCardModal, setDeleteCardModal] = useState(false);
  const [userEditProfileModal, setUserEditProfileModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [logoutModal, setLogoutModal] = useState(false);

  // const history = useHistory;

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

  const handleAddItemSubmit = ({ name, link, weather }) => {
    const newItem = {
      name,
      link,
      weather,
      token,
    };

    api
      .addClothingItem(newItem)
      .then((res) => {
        setCards([res?.data, ...cards]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const handleDeleteItem = () => {
    api
      .deleteClothingItem(selectedCard._id, token)
      .then(() => {
        // const filteredCard = clothingItems.filter(
        //   (card) => card.id !== item.id
        // );
        setCards(cards.filter((item) => item._id !== selectedCard._id));
        // setClothingItems(filteredCard);
        handleCloseModal();
        setDeleteCardModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    setLogoutModal(false);
  };

  const handleLogin = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res && res.token) {
          console.log(res);
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
    register(name, avatar, email, password)
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
    api
      .editProfile({ name, avatar, token })
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

  const openLogoutModal = () => {
    setLogoutModal(true);
    handleCloseModal();
  };

  const handleLikeClick = (id, isLiked, user) => {
    console.log(id);
    const token = localStorage.getItem("jwt");
    isLiked
      ? api
          .removeCardLike(id, user, token)
          .then((updatedCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : api
          .addCardLike(id, user, token)
          .then((updatedCard) => {
            setCards((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getClothingItems()
      .then((data) => {
        setCards(data);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
      checkToken(storedToken)
        // .then((res) => {
        //   setCurrentUser(res.data);
        //   setToken(jwt);
        //   setIsLoggedIn(true);
        // })
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
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <div>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page">
              <div className="page__wrapper">
                <Header
                  cityName={city}
                  onCreateModal={handleCreateModal}
                  handleRegistration={openRegistrationModal}
                  isLoggedIn={isLoggedIn}
                  handleLogin={openLoginModal}
                />
                <Switch>
                  <ProtectedRoute path="/profile" userLoggedIn={isLoggedIn}>
                    <Profile
                      cards={cards}
                      onSelectCard={handleSelectedCard}
                      onCreateModal={handleCreateModal}
                      onEditProfile={openEditProfileModal}
                      userLoggedIn={isLoggedIn}
                      onCardLike={handleLikeClick}
                      onLogout={openLogoutModal}
                    />
                  </ProtectedRoute>
                  <Route path="/">
                    <Main
                      weatherTemp={temp}
                      onSelectCard={handleSelectedCard}
                      cards={cards}
                      weatherCard={weatherInfo}
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
                    token={token}
                  />
                )}
                {activeModal === "preview" && (
                  <ItemModal
                    selectedCard={selectedCard}
                    onClose={handleCloseModal}
                    onOpenDeleteModal={openDeleteModal}
                  />
                )}
                {deleteCardModal && (
                  <DeleteCardModal
                    onClose={() => {
                      setDeleteCardModal(false);
                    }}
                    handleDelete={handleDeleteItem}
                    onCardDeleted={handleCloseModal}
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
                {userEditProfileModal && (
                  <EditProfileModal
                    isOpen={userEditProfileModal}
                    handleCloseModal={() => {
                      setUserEditProfileModal(false);
                    }}
                    onEditProfile={handleEditProfile}
                  />
                )}
                {logoutModal && (
                  <LogoutModal
                    handleCloseModal={() => {
                      setLogoutModal(false);
                    }}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
