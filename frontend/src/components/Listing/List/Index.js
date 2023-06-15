import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../../helper/variable";
import Show from "../Show/Inedx";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
  outline: "unset",
  border: "unset",
  minHeight: "750px",
  maxHeight: "1050px",

};

const List = ({ listings }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const sessionUser = localStorage.getItem("current_user");
  const [load, setLoad] = useState(false);
  const addFavorite = async (listing) => {
    const reqData = new FormData();
    reqData.append("favorite[listing_id]", listing?.id);
    const response = await axios(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
      data: reqData,
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

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    handleOpen();
  };

  return (
    <>
      {listings.map((listing) => (
        <div
          key={listing.id}
          style={{
            width: "30%",
            margin: "20px",
            padding: "10px",
            border: "1px solid lightgray",
            borderRadius: "5px",
            boxShadow: "0 0 10px 0 lightgray",
          }}
        >
          <img
            className="image"
            onClick={() => handleListingClick(listing)}
            src={
              (listing?.image_urls && listing?.image_urls[0]) ||
              "https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
            }
            alt={listing?.address}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          />
          {/* <div className="favorite" onClick={() => handleFavorite(listing)}>
                <FaHeart color={listing?.favorite ? "red" : "gray"} />
              </div> */}
          <div
            className="card-body"
            onClick={() => handleListingClick(listing)}
            style={{ marginTop: "10px",  cursor: "pointer" }}
          >
            <h3 style={{ margin: "0", marginBottom: "5px" }}>
              ${Math.floor(listing?.home_price).toLocaleString()}
            </h3>
            <p
              style={{
                margin: "0",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              {listing?.bedrooms} bds | {listing?.bathrooms} ba |{" "}
              {listing?.listing_size} sqft | {listing?.marketStatus}
            </p>
            <p
              style={{
                margin: "0",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              {listing?.address} | {listing?.city} | {listing?.state} |{" "}
              {listing?.zipCode}
            </p>
          </div>
        </div>
      ))}
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Show listing={selectedListing}></Show>
        </Box>
      </Modal>
    </>
  );
};
export default List;
