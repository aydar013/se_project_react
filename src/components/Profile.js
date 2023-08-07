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
}) => {
  return (
    <div className="profile">
      <SideBar handleEditProfile={onEditProfile} />
      <ClothesSection
        cards={cards}
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;
