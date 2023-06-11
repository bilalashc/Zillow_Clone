import React, {useState} from "react";

function ListingForm({
  formData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  text,
}) {

  return (
    <>
      <form
        style={{
          width: "70%",
          margin: "0 auto",
          alignItems: "unset",
          marginTop: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="home_type">Home Type:</label>

            <input
              type="text"
              name="home_type"
              id="home_type"
              value={formData.home_type}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="col-sm-6">
            <label htmlFor="address">Address:</label>

            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              name="street"
              id="street"
              value={formData.street}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              name="state"
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="zip_code">Zip Code:</label>
            <input
              type="text"
              name="zip_code"
              id="zip_code"
              value={formData.zip_code}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="text"
              name="bedrooms"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="bathrooms">Bathrooms:</label>
            <input
              type="text"
              name="bathrooms"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="listing_size">Listing Size:</label>
            <input
              type="text"
              name="listing_size"
              id="listing_size"
              value={formData.listing_size}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm-6">
            {" "}
            <label>Home Price:</label>
            <input
              type="text"
              name="home_price"
              value={formData.home_price}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <label>Rent Estimate:</label>

            <input
              type="text"
              name="rent_estimate"
              value={formData.rent_estimate}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-sm-6">
            <label>Images:</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <label>Home Overview:</label>
          <div className="col-12">
            <textarea
              className="w-100"
              name="home_overview"
              value={formData.home_overview}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        {/* <button onClick={searchAddress}>{text}</button> */}
      </form>

     
    </>
  );
}

export default ListingForm;
