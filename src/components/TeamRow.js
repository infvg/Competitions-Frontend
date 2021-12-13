import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { sendEmail } from "../services/EmailsService" 

function RowTeam(props) {
    const { row } = props;
    const onWinnerClick = (e) => {
      sendEmail(row.students,props.comp,row.name)
    }
    const [open, setOpen] = React.useState(false);
    let isWinner = row.isWinner;
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
            isWinner ? (<div><TableCell onClick={onWinnerClick}>Winner</TableCell></div>) : (<></>) // maybe replace  this with icon
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
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    
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
          <TableCell align="right">{row.link}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                { allStudents(row) ?
                
                (<div>
                  <Typography variant="h6" gutterBottom component="div">
                  Teams
                </Typography>
                  {row.teams.map((team) => (
                  <RowTeam key={team.name} row={team} comp={row.name}/>
                ))}</div>) : (<div>
                  <Typography variant="h6" gutterBottom component="div">
                  Students
                </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell align="right">Major</TableCell>
                      </TableRow>
                    </TableHead>
                  {row.teams.map((team) => (
                  <StudentRow key={team.name} row={team} comp={row.name}/>
                  
                ))}
                </Table>
                </div>)
                }
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  Row.propTypes = {
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      teams: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          isWinner: PropTypes.bool,
          students: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              stId: PropTypes.string.isRequired,
              major: PropTypes.string.isRequired
            })
          )
        })
      ).isRequired
    }).isRequired
  };
  RowTeam.propTypes = {
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      isWinner: PropTypes.bool,
      students: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          stId: PropTypes.string.isRequired,
          major: PropTypes.string.isRequired
        })
      )
    })
  };