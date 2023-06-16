import { Button } from "@mui/base";
import axios from "axios";
import { useState } from "react";
import "./Card.css";
import { BASE_URL } from "../../helper/variable";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Card = ({
  listings,
  listing,
  handleListingClick,
  handleOpenUpdate,
  handleDelete,
}) => {
  const sessionUser = JSON.parse(localStorage.getItem("current_user"));
  const [isFavourite, setIsFavourite] = useState(listing.favorite);
  const [load, setLoad] = useState(false);

  const addFavorite = async (listing) => {
    const reqData = new FormData();
    reqData.append("favorite[listing_id]", listing?.id);

    axios(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
      data: reqData,
    }).then((res) => {
      const res1 = listings?.find((list) => list.id === listing.id);
      if (res1) res1.favorite = !res1.favorite;

      setIsFavourite(listing.favorite);
    });
  };

  const deleteFavorite = async (listing) => {
    const reqData = new FormData();
    reqData.append("favorite[listing_id]", listing?.id);
    const response = await axios(`${BASE_URL}/favorites/${listing?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    }).then((res) => {
      const res1 = listings?.find((list) => list.id === listing.id);
      if (res1) res1.favorite = !res1.favorite;

      setIsFavourite(listing.favorite);
    });
  };

  const handleFavorite = (listing) => {
    if (sessionUser) {
      if (!listing?.favorite) addFavorite(listing);
      else {
        deleteFavorite(listing);
      }
      setLoad(!load);
    } else {
      alert("Please login to add into favorite");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <div  style={{ cursor: "pointer" }}>
          <img
           
            className="image"
            onClick={() => handleListingClick(listing)}
            src={
              (listing?.images && listing?.images[0]) ||
              "https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
            }
            alt={listing?.address}
          />
        </div>
        <div className="favorite" onClick={() => handleFavorite(listing)}>
          <FavoriteBorderIcon htmlColor={isFavourite ? "red" : "gray"} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="card-body"
            style={{ cursor: "pointer" }}
            onClick={() => handleListingClick(listing)}
          >
            <h3>${Math.floor(listing?.home_price).toLocaleString()}</h3>
            <p className="card-body-info" style={{ fontSize: "14px" }}>
              {listing?.bedrooms} bd
              <span
                style={{
                  borderLeft: "2px solid lightgray",
                  marginLeft: ".2rem",
                }}
              ></span>
              {listing?.bathrooms} ba{" "}
              <span style={{ borderLeft: "2px solid lightgray" }}></span>{" "}
              <span style={{ marginLeft: "0.3rem" }}></span>
              {listing?.listing_size} sqft
            </p>
            <p
              style={{ color: "black", fontSize: "14px" }}
              className="card-body-info-address"
            >
              {listing?.address}, {listing?.city}, {listing?.state},{" "}
              {listing?.zip_code}
            </p>
            <span
              style={{
                fontSize: "11px",
                display: "inline-block",
                position: "relative",
                bottom: "0.5rem",
                color: "black",
              }}
            >
              Paul Warrin DRE #01364693
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
