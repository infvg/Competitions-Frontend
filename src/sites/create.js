import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import '../css/create.css';
import Header from './headerBar'

function CompForm(props) {


  return (

      <Container>
          <div key="dopqjkwpd">
              <TextField required
                  name="compname"
                  label="Competition Name"
                  variant="filled"
                  defaultValue={props.data === undefined ? "" : props.data.name}

              />
              <TextField required
                  name="complink"
                  label="Competition Link"
                  variant="filled"
                  defaultValue={props.data === undefined ? "" : props.data.link}

              />
              <TextField required
                  name="compdate"
                  label="Competition Date"
                  variant="filled"
                  defaultValue={props.data === undefined ? "" : props.data.date}
                  type="date"
              />
              {getFromCompetition(props.data)}
          </div>

      </Container>

  );

}
function getFromCompetition(props) {
  if (props === undefined)
      return <TeamForm data={[[{}, <StudentForm data={[{ studentname: "", studentmajor: "", studentstId: "" },]} />]]} />;

  let comp = []
  props.teams.forEach(team => {
      let students = [];

      team.students.forEach(student => {
          students.push({ studentname: student.name, studentmajor: student.major, studentstId: student.stId })
      })
      comp.push([{ teamname: team.name, teamisWinner: team.isWinner }, <StudentForm data={students} />])
  })

  return <TeamForm data={comp} />
}

let counter = 0;
function TeamForm(props){
    let op = [];
    props.data.forEach((element) => {
      console.log(element)
        element[0].key = ++counter;
        op.push(element);

    });
    const [teams, setTeams] = useState(op);
    const handleChangeInput = (key, event) => {
        const newInputFields = teams.map(i => {
          if(key === i[0].key) {
            if(event.target.name === "teamisWinner")
                i[event.target.name] = event.target.checked
                else
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setTeams(newInputFields);
      }
    
    const handleAddFields = () => {
        setTeams([...teams, [{key:++counter},<StudentForm data={[{studentname: "", studentmajor: "", studentstId: ""},]} />]])
      }
    
      const handleRemoveFields = key => {
        const values  = [...teams];
        values.splice(values.findIndex(value => value.key === key), 1);
        setTeams(values);
      }
      
    return (
        <Container>
          { teams.map((inputField,i) => (
            <div key={inputField[0].key}>
              <TextField required
                label="Team Name"
                variant="filled"
                name="teamname"
                value={inputField[0].teamname}
                onChange={event => handleChangeInput(inputField[0].key, event)}
              />
                              <Checkbox
                              checked={inputField[0].teamisWinner}
                              onChange={event => handleChangeInput(inputField[0].teamname)}
                              name = "teamisWinner"
                              inputProps={{ 'aria-label': 'controlled' }}
                               />

               <Button disabled={teams.length === 1} onClick={() => handleRemoveFields(inputField.key)}>
                Remove
              </Button>
              {teams.length - 1 === i && (<Button onClick={handleAddFields}>
                Add
              </Button>)}

              <div>
                  {inputField[1]}
              </div>
            </div>
          )) }
      </Container>
    );
}


function StudentForm(props) {
    
    let op = [];
    props.data.forEach((element) => {
        element.key = ++counter;
        op.push(element);

    });
    const [students, setStudents] = useState(op);
    

    const handleChangeInput = (key, event) => {
        const newInputFields = students.map(i => {
          if(key === i.key) {
            i[event.target.name] = event.target.value
          }
          return i;
        })
        
        setStudents(newInputFields);
      }
    
    const handleAddFields = () => {
        setStudents([...students, { key:++counter,  studentname: '', studentmajor: '', studentstId:null}])
      }
    
      const handleRemoveFields = key => {
        const values  = [...students];
        values.splice(values.findIndex(value => value.key === key), 1);
        setStudents(values);
      }
    
    return (
        <Container>
          { students.map((inputField,i) => (
            <div name={inputField.key}>
              <TextField required
                label="Student ID"
                name="studentstId"
                variant="outlined"
                type="number"
                value={inputField.studentstId}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
              <TextField required
                label="Name"
                name="studentname"
                variant="outlined"
                value={inputField.studentname}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
                <TextField required
                label="Major"
                name="studentmajor"
                variant="outlined"
                value={inputField.studentmajor}
                onChange={event => handleChangeInput(inputField.key, event)}
              />
              <Button disabled={students.length === 1} onClick={() => handleRemoveFields(inputField.key)}>
                Remove
              </Button>
              {students.length - 1 === i && (<Button onClick={handleAddFields}>
                Add
              </Button>)}
            </div>
          )) }
      </Container>
    );
  }

function Create(){

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
  };
  
    return(
        <div id = 'create'>
                    <Header />
                    <div>
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }}noValidateautoComplete="off" onSubmit={handleSubmit}> 
      <div>
      <Grid container spacing={5}>
          <Grid item xs={9}>
        <CompForm data={{"name":"AIoT Hackathon with stc","link":"https://ultrahack.org/aiot-hackathon-stc","id":"A2QWDQWD","date":"2021-10-11","teams":[{"name":"Team 1","isWinner":true,"students":[{"name":"Bassel Alqahtani","major":"CS","stId":"222243860"},{"name":"Naif Essam","major":"SWE","stId":"222246560"},{"name":"Majed Ahmad","major":"COE","stId":"222219260"},{"name":"Saleh Mohammed","major":"COE","stId":"222267500"}],"winner":true}]}}/>
        </Grid>
          <Grid item xs={3}>
        <Button type="submit"> Submit</Button>
        </Grid>
        </Grid>
        </div>
        </Box>
                    </div>
         </div>

            
        
    );  
}
export default Create;