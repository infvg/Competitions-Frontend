import { Box, Button, FormControl, Grid, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CompForm from "../components/CompForm";
import Header from "./headerBar";

function Modify() {


    const [data, setData] = useState([]);
    const [competition, setCompetition] = useState('');
    const getData = () => {
      setData([{"name":"AIoT Hackathon with stc","link":"https://ultrahack.org/aiot-hackathon-stc","id":"A2DQWD","date":"2021-10-11T21:00:00.000+00:00","teams":[{"name":"Team 1","isWinner":"TRUE","students":[{"name":"Bassel Alqahtani","major":"CS","stId":"222243860"},{"name":"Naif Essam","major":"SWE","stId":"222246560"},{"name":"Majed Ahmad","major":"COE","stId":"222219260"},{"name":"Saleh Mohammed","major":"COE","stId":"222267500"}],"winner":true}]},{"name":"CyberuHub","link":"https://twitter.com/CyberhubSa","id":"WDWD1","date":"2021-10-01T21:00:00.000+00:00","teams":[{"name":"","students":[{"name":"Ahmad Mohammed","major":"CS","stId":"222253860"},{"name":"Abdullah Ali","major":"EE","stId":"222256560"},{"name":"Abdulaziz fawwaz","major":"MIS","stId":"222279260"},{"name":"Faris Ahmad","major":"SWE","stId":"222256700"}],"winner":false}]},{"name":"second","link":"https://ultrahack.org/aiot-hackathon-stc","id":"A2QWDQWD","date":"2021-10-11T21:00:00.000+00:00","teams":[{"name":"Team 1","isWinner":"TRUE","students":[{"name":"Bassel Alqahtani","major":"CS","stId":"222243860"}],"winner":true},{"name":"Team 2","isWinner":"FALSE","students":[{"name":"Bassel Alqahtanddi","major":"CS","stId":"222243860"}]}]}]);
      
      /*const result = await axios.get("http://localhost:8080/competitions/").then(response => {
      console.log(response.data);
      setTop(response.data);
    }).catch(error => this.setState({error,isLoading: false}));
    */
  }

  const getCompFromId = (name) => {
      data.forEach(comp => {
        if(comp.id === name) 
                 return comp;
      })
      return '';
  }
  const handleChange = (event) => {
    setCompetition(getCompFromId(event.target.value));
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
    return (
        <div id = 'modify'>
                    <Header />
                    <div>
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off" onSubmit={handleSubmit}> 
      <div>
      <Grid container spacing={5}>
      <Grid item xs={3}>
    <FormControl fullWidth>
      <Select 
          value={""}
          label="Competition"
          onChange={handleChange}
        >
            {
            data.forEach(comp => {
          <MenuItem value={comp.id}>{comp.name}</MenuItem>
            })
            }
        </Select>
        </FormControl>
        </Grid>
          <Grid item xs={7}>
        {(competition!=='') ? (<CompForm data={competition} />): (<p>Select a competition</p>)}
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