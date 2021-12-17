import * as React from "react";
import {useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from 'axios';
import Paper from "@mui/material/Paper";

import { useSnackbar } from "notistack";
import CompRow from "../components/CompRow";

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
  return () => {
    setTop([]);
  };

},[]);
const notifications = () => {
  getNoWinners(top).forEach(comp => {
    enqueueSnackbar(comp.name + " has ended! Modify the competition and add some winners.", {variant: "info"});
  })
}

React.useEffect(() => {
  notifications()
})
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
            <CompRow key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
  );
}
