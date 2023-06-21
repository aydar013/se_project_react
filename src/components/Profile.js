import "../blocks/Profile.css";
import React from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import ItemCard from "./ItemCard";
import "../blocks/ItemCard.css";

const Profile = ({ clothingItems, onSelectCard, onCreateModal }) => {
  // const handleCardClick = (item) => {
  //   onSelectCard(item);
  //   console.log("Selected item:", item);
  // };
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>
      <div className="profile__clothes-section">
        <ClothesSection openModal={onCreateModal} />
        <section className="profile__cards">
          <ul className="profile__cards-list main__card-items">
            {clothingItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelectCard={onSelectCard} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Profile;
