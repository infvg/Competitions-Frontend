import { Box, Button, CssBaseline, Divider, Drawer, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CompForm from "../components/CompForm";
import Header from "./headerBar";

const drawerWidth = 240;

function Modify() {

  
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

  const setDelT = () => {
    setDelete(true)

  }
  const setDelF = () => {
    setDelete(false)

  }
  React.useEffect(()=>{
    if(competition !== '')
      setForm(<CompForm data={getCompFromName(competition)} />)
  },[competition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    let comp = {teams : []};
    let curteam = 0;
    let curstudent = 0;
    data.forEach((d,i) => {
     if(i.startsWith("comp")){
       comp[i.split("comp")[1]] = d;
     }else if(i.startsWith("team")){
       if(i === "teamname" &&  comp.teams[curteam] !== undefined){
        curteam++;
       }
         if(i === "teamwinner"){
           comp.teams[curteam][i.split("team")[1]] = true;
           curstudent = 0;
         }else{
          comp.teams.push({students:[]});
          comp.teams[curteam][i.split("team")[1]] = d;
         }
     }else  if(i.startsWith("student")){
       
       if(comp.teams[curteam]["winner"]===undefined){
         
          comp.teams[curteam]["winner"] = false;
          curstudent = 0;
        }
        if(i.startsWith("studentstId")){
          comp.teams[curteam]["students"].push({});
        }
        comp.teams[curteam]["students"][curstudent][i.split("student")[1]] = d;
       if(i === "studentmajor"){
         curstudent++;
       }
         
     
     }
    })
    if(!delBut){
     axios.post("http://localhost:8080/competitions/",comp).then(function (response) {
     console.log(response);
   })
   .catch(function (error) {
     console.log(error);
   });
  }else{
    axios.post("http://localhost:8080/competitions/delete",comp).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
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
                        {form}
               
        </Grid>
          <Grid item xs={2}>
        <Button type="submit" name="save" onClick={setDelF}> Save</Button>
        <Button type="submit" name="delete" onClick={setDelT}> Delete</Button>
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