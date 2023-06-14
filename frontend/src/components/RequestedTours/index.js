import React, {useState, useEffect} from "react";
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
import Header from "../Header/Index";
import { Button } from "@mui/base";
import axios from "axios";
import { BASE_URL } from "../../helper/variable";
import Footer from "../Footer/Footer";
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


export default function RequestTours() {

  const [ requestTours, setRuestTours] = useState([])

  const handleDelete = async (id) => {
    await axios(`${BASE_URL}/request_tours/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    });
    fetchRequestTours()
  };

  const fetchRequestTours = async () => {
    const response = await axios.get(`${BASE_URL}/request_tours`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("authorization"),
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setRuestTours(response.data);
    }
  };

  useEffect(() => {
    fetchRequestTours();
  }, []);

  return (
    <>
      <Header/>
    <div style={{ padding: "3rem" }}>
      
      <div>
        <h3>Requested Tours</h3>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Phone</StyledTableCell>
                <StyledTableCell align="left">Message</StyledTableCell>
                <StyledTableCell align="left">Time</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestTours.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.phone}</StyledTableCell>
                  <StyledTableCell align="left">{row.message}</StyledTableCell>
                  <StyledTableCell align="left">{row.time}</StyledTableCell>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell align="left">
                    <div style={{ display: "flex" }}>
                      <div>
                        <Button onClick={()=> handleDelete(row.id)}>
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
    <Footer/>
    </>
  );
}
