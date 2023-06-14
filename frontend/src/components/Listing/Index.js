import { Swiper, SwiperSlide } from "swiper/react";
import Header from "../Header/Index";
import "swiper/css";
import { FaSearch } from "react-icons/fa";
import { Mousewheel, Navigation, Scrollbar, A11y } from "swiper";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Listings.css";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Show from "./Show/Inedx";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UpdateListing from "./ListingForm/UpdateListing";
import Card from "../Card";
import { BASE_URL } from "../../helper/variable";
import Footer from "../Footer/Footer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  minHeight: "750px",
  maxHeight: "1050px",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0,
  outline: "unset",
  border: "unset",
};

const Listing = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = (listing) => {
    setSelectedListing(listing);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedListing, setSelectedListing] = useState(null);
  const sessionUser = JSON.parse(localStorage.getItem("current_user"));
  const navigate = useNavigate();

  const fetchListings = async () => {
    const response = await axios.get(`${BASE_URL}/listings`);
    if (response.status === 200) {
      localStorage.setItem("listings", JSON.stringify(response.data.listings));
      localStorage.setItem(
        "google_api_key",
        JSON.stringify(response.data.google_api_key)
      );

      setListings(response.data.listings);
    } else if (response.status === 401) {
      localStorage.removeItem("authorization");
      navigate("/");
    }
  };

  const handleUpdate = () => {
    setOpenUpdate(false);
    fetchListings();
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    handleOpen();
  };

  const handleSearch = async () => {
    const res = await axios(`${BASE_URL}/listings/search?q=${search}`);
    localStorage.setItem("searched_listings", JSON.stringify(res.data));
    navigate("/Search");
  };

  const handleDelete = async (listing) => {
    const response = await axios(`${BASE_URL}/listings/${listing?.id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => alert(err.message));
    alert("This Listing Has Been Successfully Deleted!");
    fetchListings();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value == "") {
      debugger;
      const list = JSON.parse(localStorage.getItem("listings"));
      setListings(list);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          height: "500px",
          width: "100%",
          backgroundImage: `url("https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/5/2022/08/ZG_ZPA_08_21_Americana_ExtFront_1081_4936px_desktopWebp2x-2-scaled.webp")`,
          paddingBottom: "150px",
          objectFit: "cover",
        }}
      >
        <div className="container__primaryheading">
          <h1>Find it. Tour it. Own it.</h1>
          <div className="container__searchbar">
            <input
              style={{ width: "100%" }}
              type="text"
              placeholder="Enter an address, neighborhood, city or zipcode"
              onChange={(e) => handleSearchChange(e)}
              onKeyDown={handleKeyDown}
            />
            <div className="container__searchbar__icon">
              <Button onClick={handleSearch}>
                <FaSearch size={25} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <h1
        style={{
          marginLeft: "2.5rem",
          position: "relative",
          top: "1rem",
          fontSize: "16px",
        }}
      >
        {/* Current Listings in California */}
        Trending Homes in San Francisco, CA
      </h1>
      <div
        style={{
          margin: "30px 0 -180px 40px",
          position: "relative",
          bottom: "1rem",
          color: "grey",
        }}
      >
        <span>Popular listings in the area</span>
      </div>
      <div style={{ marginBottom: "50px" }}>
        <Swiper
          modules={[Navigation, Mousewheel, Scrollbar, A11y]}
          spaceBetween={-40}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {listings &&
            listings?.map((listing) => (
              <SwiperSlide key={listing?.id} style={{ padding: "30px" }}>
                <Card
                  listings={listings}
                  listing={listing}
                  handleListingClick={handleListingClick}
                  handleOpenUpdate={handleOpenUpdate}
                  handleDelete={handleDelete}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateListing
            style={{
              overflowY: "auto",
            }}
            handleClose={handleUpdate}
            listing={selectedListing}
          ></UpdateListing>
        </Box>
      </Modal>

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
      <Footer/>
    </>
  );
};

export default Listing;
