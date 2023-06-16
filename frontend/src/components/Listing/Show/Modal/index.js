import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Modal, Select, MenuItem, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./index.css";
import { Mousewheel, Navigation, Scrollbar, A11y } from "swiper";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import TourRequestModal from "./TourRequestModal/index";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "scroll",
  height: 720,
  overflowX: "hidden",
  borderRadius: 2,
};

const timeVariable = [
  "11:00 am",
  "12:00 pm",
  "1:00 pm",
  "2:00 pm",
  "3:00 pm",
  "4:00 pm",
  "5:00 pm",
  "6:00 pm",
  "7:00 pm",
  "8:00 pm",
  "9:00 pm",
  "10:00 pm",
  "11:00 pm",
  "12:00 am",
  "1:00 am",
  "2:00 am",
  "3:00 am",
  "4:00 am",
  "5:00 am",
  "6:00 am",
  "7:00 am",
  "8:00 am",
  "9:00 am",
  "10:00 am",
];

export default function BasicModal({listing}) {
  const [open, setOpen] = React.useState(false);
  const [requestForm, setRequestForm] = useState({
    type: "",
    date: null,
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    listing_id: listing.id,
    owner_id: listing.user_id
  })
  const handleOpen = () => setOpen(true);
  const handleCloseRequest = () => setOpen(false);
  const [selected, setSelected] = React.useState("");
  const [currentDate, setCurrentDate] = useState("");
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const date = new Date();
  var arr = [];
  for (let i = 0; i < 7; i++) {
    debugger;
    const formattedDate = moment(date).add(i, "days").format("MMMM Do");
    const day = moment(date).add(i, "days").format("dddd");
    const dateAndDay = { date: formattedDate, day: day };
    arr.push(dateAndDay);
    console.log(arr);
  }
  return (
    <div>
        <Button className="button__container__contact__agent__tourButton" variant="contained" color="primary" onClick={handleOpen}>
          Request a tour
          <span>as early as today at 12:30 pm</span>
        </Button>
      <Modal
        open={open}
        onClose={handleCloseRequest}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="tour__request__container">
            <div className="tour__request__container__top">
              <div className="tour__request__container__top__title">
                <span>Tour with a Buyer's Agent</span>
              </div>
              <div className="tour__request__container__top__Icon">
                {" "}
                <CloseIcon onClick={handleCloseRequest} />
              </div>
            </div>
            <div className="tour__request__container__border">
              <hr />
            </div>
            <div className="tour__request__container__tabs__container">
              <div className="tour__request__container__tabs__container__persontab">
                <div
                  className={
                    requestForm.type == "In Person"
                      ? "tour__request__container__tabs__container__persontab__title"
                      : ""
                  }
                >
                  <Button
                    onClick={() =>
                      setRequestForm({ ...requestForm, type: "In Person" })
                    }
                  >
                    In-person
                  </Button>
                </div>
              </div>
              <div className="tour__request__container__tabs__container__persontab">
                <div
                  className={
                    requestForm.type == "Video Chat"
                      ? "tour__request__container__tabs__container__persontab__title"
                      : ""
                  }
                >
                  <Button
                    onClick={() =>
                      setRequestForm({ ...requestForm, type: "Video Chat" })
                    }
                  >
                    video chat
                  </Button>
                </div>
              </div>
            </div>
            <div className="tour__request__container__preferredtime__title">
              <p>Select a preferred time</p>
            </div>

            <div
              style={{
                height: "168px",
                position: "relative",
                bottom: "3.5rem",
              }}
              className="tour"
            >
              <Swiper
                modules={[Navigation, Mousewheel, Scrollbar, A11y]}
                spaceBetween={-15}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {arr.map((item) => (
                  <SwiperSlide key={1}>
                    <div className="tour__request__container__border__container__second">
                      <Button
                        onClick={() =>
                          setRequestForm({
                            ...requestForm,
                            date: item.date,
                          })
                        }
                      >
                        <div
                          className={
                            requestForm.date == item.date
                              ? "tour__request__container__tabs__container__persontab__title"
                              : ""
                          }
                        >
                          <div className="tour__request__container__border__container__subcontainer">
                            <div className="tour__request__container__border__container__subcontainer__days">
                              <p>{item.day}</p>
                            </div>
                            <div className="tour__request__container__border__container__subcontainer__dates">
                              <p>{item.date}</p>
                            </div>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div  className="tour__request__container__time_selector">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel
                    style={{ marginLeft: "1rem" }}
                    id="demo-simple-select-label"
                  >
                    Time
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Time"
                    style={{
                      width: "95%",
                      marginLeft: "1rem",
                    }}
                    value={requestForm.time}
                    onChange={(e) => setRequestForm({...requestForm, time: e.target.value})}
                  >
                    {timeVariable.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="tour__request__container__tourbutton">
              <TourRequestModal requestForm={requestForm} setRequestForm={setRequestForm} handleCloseRequest={handleCloseRequest}/>
            </div>
            <div className="tour__request__container__image">
              <img src="https://photos.zillowstatic.com/fp/9f4f9b85918fb3e791e1fc75e0c8a804-cc_ft_768.webp" />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
