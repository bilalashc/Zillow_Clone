import { useEffect, useState } from "react";
import Header from "../../Header/Index";
import axios from "axios";
import { BASE_URL } from "../../../helper/variable";
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
import Modal from "@mui/material/Modal";
import UpdateListing from "../ListingForm/UpdateListing";
import Show from "../Show/Inedx";
import Footer from "../../Footer/Footer"
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

const UserList = () => {
  const [userListings, setUserListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleOpenUpdate = (listing) => {
    setSelectedListing(listing);
    setOpenUpdate(true);
  };


  const handleUpdate = () => {
    setOpenUpdate(false);
    fetchListings();
  }

  const handleDelete = async (id) => {
    const response = await axios(`${BASE_URL}/listings/${id}`, {
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

  const fetchListings = async () => {
    const response = await axios
      .get(`${BASE_URL}/listings/user_listings`, {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => setUserListings(res.data))
      .catch((err) => alert(err.message));
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    handleOpen();
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "3rem" }}>
        <div>
          <h3>My Listings</h3>
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
                {userListings.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      <img
                        onClick={() => handleListingClick(row)}
                        style={{ height: "34px", width: "75px", cursor: "pointer" }}
                        src={
                          (row?.images && row?.images[0]) ||
                          "https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
                        }
                        alt={row?.address}
                      />
                    </StyledTableCell>
                    <StyledTableCell style={{ cursor: "pointer" }} align="left" onClick={() => handleListingClick(row)}>
                      ${Math.floor(row?.home_price).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell style={{ cursor: "pointer" }} align="left" onClick={() => handleListingClick(row)}>
                      {row.bathrooms}
                    </StyledTableCell>
                    <StyledTableCell style={{ cursor: "pointer" }} align="left" onClick={() => handleListingClick(row)}>
                      {row?.address}, {row?.city}, {row?.state}, {row?.zipCode}
                    </StyledTableCell>
                    <StyledTableCell style={{ cursor: "pointer" }} align="left" onClick={() => handleListingClick(row)}>
                      {row?.listingSize} sqft - Condo for sale
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div style={{ display: "flex" }}>
                      <div>
                          <Button onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </Button>
                        </div>
                        <div>
                          <Button onClick={() => handleOpenUpdate(row)}>
                            <EditIcon />
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
export default UserList;
