import { Box, Button, CssBaseline, Divider, Drawer, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CompForm from "../components/CompForm";
import Header from "./headerBar";

const drawerWidth = 240;

function Modify() {


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

    const handleSubmit = (e) => {

        e.preventDefault();
       const data = new FormData(e.target);
  
       let comp = {teams : []};
       let team = {students: []}
       let student = {}
       data.forEach((d,i) => {
        if(i.startsWith("comp")){
          comp[i.split("comp")[1]] = d;
        }else if(i.startsWith("team")){
          if(team["students"].length > 0){
            comp["teams"].push(team);
            team = {students: []}
          }
            if(i === "teamwinner"){
              team[i.split("team")[1]] = true;
            }else{
            team[i.split("team")[1]] = d;
            }
        }else  if(i.startsWith("student")){
          if(team["winner"]===undefined)
            team["winner"] = false;
  
          if(student["major"] !== undefined){
            team["students"].push(student);
            student = {}
          }
            student[i.split("student")[1]] = d;
        
        }
       })
       team["students"].push(student)
       comp["teams"].push(team)
       axios.post("http://localhost:8080/competitions/",comp).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  
      window.location.href = "/";
    };
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
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off" onSubmit={handleSubmit}> 
                        <div>
                        <Grid container spacing={5}>
                        <Grid item xs={7}>
                        <CompForm data={getCompFromName(competition)} />
               
        </Grid>
          <Grid item xs={2}>
        <Button type="submit" name="save"> Save</Button>
        <Button type="submit" name="delete"> Delete</Button>
            </Grid>
            </Grid>
            </div>
            </Box>
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


export default Modify