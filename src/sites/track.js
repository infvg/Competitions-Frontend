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
import CompRow from "../components/CompRow";
import Timer from "../components/Timer";


const drawerWidth = 240;

function Track() {

  
    const [data, setData] = useState([]); 
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
      setForm(<div>
          <Timer date={getCompFromName(competition).date} />
          <CompRow key={competition} row={getCompFromName(competition)} /></div>)
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
          <p><a href="./">Home</a></p>
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