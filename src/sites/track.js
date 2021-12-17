import { Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemText,  Toolbar } from "@mui/material";
import axios from "axios";
import Header from "./headerBar";
import * as React from "react";
import {useState } from 'react';
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import DateCountdown from 'react-date-countdown-timer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import StudentRow from "../components/StudentRow"
import TeamRow from "../components/TeamRow";


const drawerWidth = 240;
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

function Track() {

  
    const [data, setData] = useState([]);
    const [delBut, setDelete] = useState(false);
    const [competition, setCompetition] = useState('');
    const [form, setForm] = useState()
    const getData = () => {  
        const result = axios.get("http://localhost:8080/competitions/").then(response => {
        setData(fixDate(response.data));
      }).catch(error => setData([]));
      
      }
    const fixDate = (data) => {
      data.map((comp1) => {
        comp1.date = comp1.date.substring(0,10);
      })
      return data;
    }
  const getCompFromName = (name) => {
    let returner = {}
    data.map(comp =>  {
      if(comp.name === name) {  
          returner = comp;
      }
    })
    return returner;
}

  const handleChange = (event) => {
      let text = event.target.innerText;
    if(text !== ''){
    setCompetition(text);
    }
  };
  React.useEffect(()=>{
    getData();
    return () => {
      setData([]);
    };
  },[]);
  const swapday = (date) => {
      return date.substring(0,4) + "-" + date.substring(5,7) + "-" + date.substring(8,10)
  }
  React.useEffect(()=>{
    if(competition !== ''){
        console.log(swapday(getCompFromName(competition).date))
      setForm(<div>
          <DateCountdown dateTo="January 01, 2023 00:00:00 GMT+03:00" mostSignificantFigure="year" />
          <Row key={competition} row={getCompFromName(competition)} /></div>)
    }
  },[competition]);

    const menuItems = data.map(item => (
        <ListItem button key={item.name} value={item.name}><ListItemText primary={item.name} onClick={handleChange} /></ListItem>
      ));
    return (
        <div id = 'modify'>
                    <Header />
                    <div>
                    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {competition !== '' ? (
            <div>
                {form}
            </div>
        )
        : (<p>Select a competition</p>)
        }
      </Box>
    </Box>
         </div>
         </div>
    );

}


export default Track