import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { sendEmail } from "../services/EmailsService" 
import { Box, Collapse, IconButton, Typography } from '@mui/material';

function TeamRow(props) {
    const { row } = props;
    const onWinnerClick = (e) => {
      sendEmail(row.students,props.comp,row.name)
    }
    const [open, setOpen] = React.useState(false);
    let winner = row.winner;
    console.log(row)
    return (
  
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          {
            !winner ? (<div><TableCell onClick={onWinnerClick}>Winner <EmailIcon /></TableCell></div>) : (<></>) // maybe replace  this with icon
          }
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Students
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell align="right">Major</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.students.map((student) => (
                        <TableRow key={student.name}>
                          <TableCell component="th" scope="row">
                            {student.name}
                          </TableCell>
                          <TableCell>{student.stId}</TableCell>
                          <TableCell align="right">{student.major}</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  TeamRow.propTypes = {
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      winner: PropTypes.bool,
      students: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          stId: PropTypes.string.isRequired,
          major: PropTypes.string.isRequired
        })
      )
    })
  };

  export default TeamRow;