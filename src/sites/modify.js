import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CompForm from "../components/CompForm";
import Header from "./headerBar";

function Modify() {


    const [data, setData] = useState([]);
    const [competition, setCompetition] = useState('');
    const getData = () => {  
        const result = axios.get("http://localhost:8080/competitions/").then(response => {
        setData(fixDate(response.data));
      }).catch(error => this.setState({error,isLoading: false}));
      
      }
    const fixDate = (data) => {
      data.map((comp1) => {
        comp1.date = comp1.date.substring(0,10);
      })
      return data;
    }
  const getCompFromName = (name) => {
    let returner = {}
    data.forEach(comp => {
      if(comp.name === name) {  
          returner = comp;
      }
    })
    return returner;
}
  const handleChange = (event) => {
    setCompetition(getCompFromName(event.target.value).name);
  };
  React.useEffect(getData,[]);

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
            if(i === "teamisWinner"){
              team[i.split("team")[1]] = true;
            }else{
            team[i.split("team")[1]] = d;
            }
        }else  if(i.startsWith("student")){
          if(team["isWinner"]===undefined)
            team["isWinner"] = false;
  
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
        <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
      ));
    return (
        <div id = 'modify'>
                    <Header />
                    <div>
                        <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off" onSubmit={handleSubmit}> 
      <div>
      <Grid container spacing={5}>
      <Grid item xs={3}>
    <FormControl fullWidth>
    <InputLabel id="select-label">Competition</InputLabel>
      <Select 
          labelId="select-label"
          id="select"
          value={competition}
          label="selector"
          onChange={handleChange}
        >
            {menuItems}
        </Select>
        </FormControl>
        </Grid>
          <Grid item xs={7}>
        {(competition!=='') ? (<CompForm data={getCompFromName(competition)}/>): (<p>Select a competition</p>)}
        </Grid>
          <Grid item xs={2}>
          {(competition!=='') ? (<div>
              
        <Button type="submit"> Submit</Button>
        <Button type="delete"> Delete</Button>
          </div>) : (<div>
              
        <Button type="submit" disabled> Submit</Button>
        <Button type="delete" disabled> Delete</Button>
          </div>)}
        </Grid>
        </Grid>
        </div>
        </Box>
                    </div>
         </div>
    );

}
export default Modify