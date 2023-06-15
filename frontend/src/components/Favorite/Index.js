import List from "../Listing/List/Index";
import { useEffect, useState } from "react";
import Header from "../Header/Index";
import axios from "axios";
import { BASE_URL } from "../../helper/variable";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import Show from "../Listing/Show/Inedx";
import Modal from "@mui/material/Modal";
import Footer from "../Footer/Footer";
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
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const handleDelete = async (id) => {
    await axios(`${BASE_URL}/request_tours/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    });
    fetchListings()
  };
  const fetchListings = async () => {
    const response = await axios.get(`${BASE_URL}/favorites`, {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      localStorage.setItem("listings", JSON.stringify(response.data));
      setFavorites(response.data);
    }
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    handleOpen();
  };

  const deleteFavorite = async (id) => {
   
    const response = await axios(`${BASE_URL}/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    }).then((res) => {
      fetchListings()
    })
    .catch((error) => {
      alert(error.message)
    })
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "3rem" }}>
      
      <div>
        <h3>Favourite </h3>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Bath Room</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="left">Area</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {favorites.map((row) => (
                <StyledTableRow key={row.name} >
                  <StyledTableCell component="th" scope="row">
                  <img
                    onClick={() => handleListingClick(row)}
                    style={{ height: "34px", width: "75px", cursor: "pointer"}}
                    src={
                      (row?.images && row?.images[0]) ||
                      "https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
                    }
                    alt={row?.address}
                  />
                  </StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }} align="left" onClick={() => handleListingClick(row)}>${Math.floor(row?.home_price).toLocaleString()}</StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }} align="left" onClick={() => handleListingClick(row)}>{row.bathrooms}</StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }}  align="left" onClick={() => handleListingClick(row)}>{row?.address}, {row?.city}, {row?.state},{" "} {row?.zipCode}</StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }}  align="left" onClick={() => handleListingClick(row)}>{row?.listing_size} sqft</StyledTableCell>
                  <StyledTableCell style={{ cursor: "pointer" }}  align="left">
                    <div style={{ display: "flex" }}>
                      <div>
                        <Button onClick={()=> deleteFavorite(row.id)}>
                          <DeleteIcon />
                        </Button>
                      </div>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
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
export default Favorite;
