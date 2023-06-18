import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingForm from "./Index";

import { BASE_URL } from "../../../helper/variable";


const UpdateListing = ({ handleClose, listing }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    home_type: listing?.home_type,
    address: listing?.address,
    street: listing?.street,
    city: listing?.city,
    state: listing?.state,
    zip_code: listing?.zip_code,
    bedrooms: listing?.bedrooms,
    bathrooms: listing?.bathrooms,
    listing_size: listing?.listing_size,
    home_price: listing?.home_price,
    rent_estimate: listing?.rent_estimate,
    home_overview: listing?.home_overview,
    images: listing?.images,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    const reqData = new FormData();
    reqData.append("listing[home_type]", formData.home_type);
    reqData.append("listing[address]", formData.address);
    reqData.append("listing[street]", formData.street);
    reqData.append("listing[city]", formData.city);
    reqData.append("listing[state]", formData.state);
    reqData.append("listing[zip_code]", formData.zip_code);
    reqData.append("listing[bedrooms]", formData.bedrooms);
    reqData.append("listing[bathrooms]", formData.bathrooms);
    reqData.append("listing[listing_size]", formData.listing_size);
    reqData.append("listing[home_price]", formData.home_price);
    reqData.append("listing[rent_estimate]", formData.rent_estimate);
    reqData.append("listing[home_overview]", formData.home_overview);
    for (let i = 0; i < (formData.images && formData.images.length); i += 1) {
      reqData.append("listing[images][]", formData.images[i]);
    }

    axios(`${BASE_URL}/listings/${listing.id}`, {
      method: "PUT",
      headers: { Authorization: localStorage.getItem("authorization") },
      data: reqData,
    })
      .then((response) => {
        if (response.status === 200) {
          handleClose();
          alert("Listing is updated Successfully");
          
          // Handle successful creation of Listing
        } else {
          throw new Error("Failed to create Listing");
        }
      })
      .catch((error) => {
        // Handle error creating Listing
      });
  };
  return (
    <ListingForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      text="Update"
    ></ListingForm>
  );
};

export default UpdateListing;
