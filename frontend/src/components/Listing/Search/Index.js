import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Header from "../../Header/Index";
import List from "../List/Index";

const Search = () => {
  const listings = JSON.parse(localStorage.getItem("searched_listings"));

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {listings.length > 0 && listings ? (
          <List listings={listings}></List>
        ) : (
          <>
            <h2>No result found</h2>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
