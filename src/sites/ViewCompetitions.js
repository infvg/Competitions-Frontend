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
import Button from "@mui/material/Button"
import axios from 'axios';
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ListItem, Snackbar } from "@mui/material";

import StudentRow from "../components/StudentRow"
import Notification from "../components/notification";
import { SnackbarProvider, useSnackbar } from "notistack";
import App from "../App";

function allStudents(props){
  let OverOne = false;
    props.teams.map(team => {
      if(team.students.length > 1)
        OverOne = true;

  });
    return OverOne;
}

function getemails(students) {
  let emails = [];
    students.forEach(student => {
      emails.push("s" + student.stId + "@kfupm.edu.sa")
    });
    return emails.join(",");
}

function email(students,competition,dear){
  window.location = "mailto:" + getemails(students) + "?subject=Congratulation%20on%20achieving%20a%20win%20in%20"+competition+"&body=Dear%20"+dear+"%2C%0D%0A%0D%0AConguratulation%20on%20your%20achievement%20in%20"+competition+".%20This%20achievement%20is%20deeply%20appreciated%20by%20the%20unversity%20and%20we%20will%20announce%20it%20in%20the%20approbrite%20medias.%0D%0A%0D%0AIn%20case%20you%20have%20Photos%20you%20want%20to%20share%20with%20the%20news%20post%2C%20reply%20to%20this%20email%20with%20the%20photos.%0D%0A%0D%0ARegards%20and%20Congrats%2C%0D%0AKFUPM%20News%20Team%0D%0A";
}
function RowTeam(props) {
  const { row } = props;
  const onWinnerClick = (e) => {
    email(row.students,props.comp,row.name)
  }
  const [open, setOpen] = React.useState(false);
  let winner = row.winner;
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
          winner ? (<div><TableCell onClick={onWinnerClick}>Winner</TableCell></div>) : (<></>) // maybe replace  this with icon
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
RowTeam.propTypes = {
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

export default function ViewCompetitions() {
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
