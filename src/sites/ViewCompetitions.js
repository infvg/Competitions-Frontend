import * as React from "react";
import {useState } from 'react';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import StudentRow from "../components/StudentRow"
import TeamRow from "../components/TeamRow";
import { useSnackbar } from "notistack";

function allStudents(props){
  let OverOne = false;
    props.teams.map(team => {
      if(team.students.length > 1)
        OverOne = true;

  });
    return OverOne;
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
        <TableCell align="right"><a href ={row.link}>{row.link}</a></TableCell>
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
                <TeamRow key={team.name} row={team} comp={row.name}/>
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
        winner: PropTypes.bool,
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

export default function ViewCompetitions() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [top, setTop] = useState([]);
  const getData = () => {  
    const result = axios.get("http://localhost:8080/competitions/").then(response => {
    setTop(fixDate(response.data));
  }).catch(error => setTop([]));
  
  }
const fixDate = (data) => {
  data.map((comp1) => {
    comp1.date = comp1.date.substring(0,10);
  })
  return data;
}

const getNoWinners = (comps) => {
  let none = []  
  const isDateBeforeToday = (date)  => {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  comps.map(comp => {
      if(isDateBeforeToday){
        let hasWinner = false;

        comp.teams.map(team => {
          if(team.winner)
            hasWinner = true;
        })

        if(!hasWinner)
            none.push(comp);
      }
    })
    return none;
}
React.useEffect(()=>{
  getData();

  getNoWinners(top).forEach(comp => {
    enqueueSnackbar(comp.name + " has ended! Modify the competition and add some winners.", {variant: "info"});
  })
  return () => {
    setTop([]);
  };

},[]);
  return (
    <div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Competition</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {top.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
  );
}
