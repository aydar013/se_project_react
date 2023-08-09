import "../blocks/Profile.css";
import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/ItemCard.css";

const Profile = ({
  cards,
  onSelectCard,
  onCreateModal,
  onEditProfile,
  onCardLike,
  handleLogOut,
}) => {
  return (
    <section className="profile__section">
      <div className="profile">
        <SideBar
          handleEditProfile={onEditProfile}
          handleLogOut={handleLogOut}
        />
        <ClothesSection
          cards={cards}
          onCreateModal={onCreateModal}
          onSelectCard={onSelectCard}
          onCardLike={onCardLike}
        />
      </div>
    </section>
  );
};

export default Profile;
